import { objectType } from "@nexus/schema";

export default objectType({
  name: "AdminPayments",
  definition(t) {
    t.list.field("adminPayments", {
      type: "AdminPayment",
      description: "List of paginated payments",
    });
  },
});
