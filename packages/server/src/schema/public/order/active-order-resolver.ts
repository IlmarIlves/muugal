import { extendType, idArg } from "@nexus/schema";
import { OrderEntity } from "../../../entities/OrderEntity";

export default extendType({
  type: "Query",
  definition(t) {
    t.list.field("activeOrder", {
      type: "Order",
      description: "List of orders",
      args: {
        userId: idArg({ description: "User id" }),
      },
      resolve: (_parent, args, _context) => {

        // return categories of requested type
        return OrderEntity.find({where: {userId: args.userId}});
      },
    });
  },
});
