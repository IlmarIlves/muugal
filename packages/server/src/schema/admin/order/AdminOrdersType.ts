import { objectType } from "@nexus/schema";

export default objectType({
  name: "AdminOrders",
  definition(t) {
 
    t.list.field("adminOrders", {
      type: "AdminOrder",
      description: "List of paginated orders",
    });
  },
});
