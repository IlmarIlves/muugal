import { objectType } from "@nexus/schema";

export default objectType({
  name: "AdminPayments",
  definition(t) {
 
    t.list.field("payments", {
      type: "AdminPayment",
      description: "List of paginated orders",
    });
  },
});
