import { objectType } from "@nexus/schema";

export default objectType({
  name: "AdminPayment",
  definition(t) {
    t.id("id", { description: "Payment unique id" });
    t.id("userId", { description: "Payment user unique id" });
    t.string("stripeSessionId", { description: "Payment user unique id" });
    // t.field("status", { type: "PaymentStatus", description: "Payment status" });
    t.int("amount", {  description: "Payment amount" });
    t.string("currencyCode", {  description: "Payment currencyCode" });
    t.string("emailUsedForPayment", {  description: "Payment currencyCode" });
  },
});
