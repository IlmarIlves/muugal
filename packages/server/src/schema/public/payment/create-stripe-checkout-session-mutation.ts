import { mutationField,intArg, stringArg  } from "@nexus/schema";
import { verify } from "jsonwebtoken";
import { PaymentEntity, PaymentStatus } from "../../../entities/PaymentEntity";
import { UserEntity } from "../../../entities/UserEntity";
import { stripe } from "../../../services/setupStripe";

export default mutationField("createStripeCheckoutSession", {
  type: "Payment",
  description: "Creates new Stripe checkout session",
  args: {
    productName: stringArg({description: "Product name"}),
    priceInCents: intArg({ description: "Product price" }),
    quantity: intArg({ description: "Product quantity" }),
  },
  resolve: async (_parent, args, context) => {
    const token = context.req.cookies.jid;

    if(!token) {
      return null;
    }

    let payload: any = null ;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!)
    } catch (error) {
      console.log(error);
      return null;
    }

    const user = await UserEntity.findOne({id: payload.userId})

    if(!user) {
      throw new Error("No user found, this should not happen");
    }
 
    // create stripe session
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer: user.stripeCustomerId ?? undefined,     
      success_url: "localhost:3000/register",
      cancel_url: "localhost:3000/",
      line_items: [
        {price_data: 
          {product_data: {name: args.productName}, 
          currency: "usd", 
          unit_amount: args.priceInCents}, 
          quantity: args.quantity,
        }
        ]
    });

    if (!stripeSession) {
      throw new Error("Stripe session creation failed, this should not happen");
    }

    if (stripeSession.amount_total === null) {
      throw new Error("Stripe session did not return total amount, this should not happen");
    }

    // create payment entry
    const payment = new PaymentEntity();

    payment.user = Promise.resolve(user);
    payment.stripeSessionId = stripeSession.id;
    payment.amount = args.priceInCents;
    payment.status = PaymentStatus.STARTED;

    await payment.save();

    return payment;
  },
});
