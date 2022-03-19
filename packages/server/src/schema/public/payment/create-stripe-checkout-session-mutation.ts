import { mutationField, stringArg } from "@nexus/schema";
import { JSONSchema4 } from "json-schema";
// import { UnauthorizedError, validate } from "../../../../lib/validate";
import { config } from "../../../config";
import { fieldLength } from "../../../constants";
import { PaymentEntity, PaymentMethod, PaymentStatus } from "../../../entities/PaymentEntity";

import { stripe } from "../../../services/setupStripe";

const schema: JSONSchema4 = {
  $async: true,
  type: "object",
  properties: {
    subscriptionId: {
      title: "Subscription ID",
      type: "string",
      minLength: 1,
      maxLength: fieldLength.uuid,
      // format: "existing-product",
    },
  },
  required: ["subscriptionId"],
};

export default mutationField("createStripeCheckoutSession", {
  type: "Payment",
  description: "Creates new Stripe checkout session",
  args: { subscriptionId: stringArg() },
  resolve: async (_parent, args, context) => {
    const { viewer } = context;

    // if (!viewer) {
    //   throw new UnauthorizedError();
    // }

    // // validate arguments
    // await validate(args, schema);

    // create stripe session
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer: viewer.stripeCustomerId ?? undefined,
      mode: "payment",
      success_url: config.stripe.successUrl,
      cancel_url: config.stripe.cancelUrl,
    });

    if (!stripeSession) {
      throw new Error("Stripe session creation failed, this should not happen");
    }

    if (stripeSession.amount_total === null) {
      throw new Error("Stripe session did not return total amount, this should not happen");
    }

    // create payment entry
    const payment = new PaymentEntity();

    payment.user = Promise.resolve(viewer);
    payment.stripeSessionId = stripeSession.id;
    payment.amount = stripeSession.amount_total;
    payment.method = PaymentMethod.STRIPE;
    payment.status = PaymentStatus.STARTED;

    await payment.save();

    return payment;
  },
});
