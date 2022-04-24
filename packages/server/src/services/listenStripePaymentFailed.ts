import { raw } from "body-parser";
import { Router } from "express";
import Stripe from "stripe";
import { PaymentEntity,  PaymentStatus } from "../entities/PaymentEntity";
import { UserEntity } from "../entities/UserEntity";
import { constructStripeEvent } from "./constructStripeEvent";


// this event is triggered if customer payment fails from Stripe subscriptions
export function listenStripePaymentFailed() {
  const router = Router();

  // stripe event verification needs raw body
  router.post("/", raw({ type: "application/json" }), async (req, res) => {
    const stripeSignature = req.headers["stripe-signature"];

    // verify payload we get from the request
    const event = constructStripeEvent(req.body as Buffer, stripeSignature);

    if (!event) {
      return res.status(400).send(`Constructing event failed, please check logs`);
    }

    // allow only "invoice.payment_failed" event to come through this listener
    if (event.type !== "invoice.payment_failed") {
        console.log({ event }, "got wrong event type, please send only event: `invoice.payment_failed` to this listener");

      return res
        .status(403)
        .send("Wrong event type, please configure webhook to only send event: `invoice.payment_failed`");
    }

    // event.data.object returns as a Stripe invoice
    const invoice = event.data.object as Stripe.Invoice;

    // just in case do not allow query customers by stripeCustomerId with null value
    if (!invoice.customer) {
        console.log({ invoice }, "missing customer from Stripe invoice");

      return res.status(404).send(`Webhook Error: Stripe did not return any customer to our system`);
    }

    // get user with Stripe customer ID
    const user = await UserEntity.findOne({ where: { stripeCustomerId: invoice.customer } });

    if (!user) {
        console.log(
        {
          invoice,
        },
        "did not find customer with provided stripe id",
      );

      return res.status(404).send(`Webhook Error: Did not find customer with provided stripe id`);
    }

    // check subscription ID from Stripe
    if (!invoice.subscription) {
        console.log({ invoice }, "missing subscription from Stripe invoice");

      return res.status(404).send(`Webhook Error: Stripe did not return any subscription to our system`);
    }

    // create new payment and mark it as RENEW FAILED
    const payment = new PaymentEntity();

    payment.userId = user.id;
    payment.status = PaymentStatus.RENEW_FAILED;
    payment.amount = invoice.amount_due;
    payment.emailUsedForPayment = invoice.customer_email;

    await payment.save();

    console.log(
      {
        invoice,
        user,
      },
      "updating customer subscription failed due to user error",
    );

    // return a response to acknowledge receipt of the event
    return res.status(200).send("OK");
  });

  return router;
}
