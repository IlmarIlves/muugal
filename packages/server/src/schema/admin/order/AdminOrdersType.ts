import { objectType } from "@nexus/schema";

export default objectType({
  name: "AdminOrders",
  definition(t) {
 
    t.list.field("orders", {
      type: "AdminOrder",
      description: "List of paginated orders",
    });
  },
});
