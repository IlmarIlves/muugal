import { extendType, idArg, intArg } from "@nexus/schema";
import { OrderEntity } from "../../../entities/OrderEntity";

export default extendType({
  type: "Admin",
  definition(t) {
    t.field("order", {
      type: "AdminOrder",
      description: "Admin order by id",
      args: {
        orderId: idArg({ description: "User identifier" }),
        priceInCents: intArg({description: "Order price in cents"}),
      },
      resolve: async (_parent, args, _context) => {

        const { orderId } = args;

        const order = await OrderEntity.findOne({ where: { id: orderId } });

        if (!order) {
          throw new Error("Fetch order by id passed validation but could not be found, this should not happen");
        }

        order.priceInCents = args.priceInCents
        order.save();

        return order;
      },
    });
  },
});
