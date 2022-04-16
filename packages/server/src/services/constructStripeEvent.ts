import { Stripe } from "stripe";
import { config } from "../config";
import { stripe } from "./setupStripe";


export function constructStripeEvent(
  payload: string | Buffer,
  stripeSignature: string | string[] | undefined,
): Stripe.Event | undefined {
  if (!stripeSignature) {
    console.log("constructing stripe webhook event failed: missing signature");
    return;
  }

  try {
    const endpointSecret = config.stripe.webhookSecretKey;

    return stripe.webhooks.constructEvent(payload, stripeSignature, endpointSecret);
  } catch (error) {
    console.log({ error }, "constructing stripe webhook event failed");
    return;
  }
}
