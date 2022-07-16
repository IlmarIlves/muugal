import { extendType, idArg } from "@nexus/schema";
import { OffersEntity } from "../../../entities/OffersEntity";
import { OrderEntity } from "../../../entities/OrderEntity";

export default extendType({
  type: "Query",
  definition(t) {
    t.list.field("offers", {
      type: "Offer",
      description: "List of orders",
      args: {
        userId: idArg({ description: "User id" }),
      },
      resolve: (_parent, args, _context) => {

        // return categories of requested type
        return OffersEntity.find({where: {userId: args.userId}});
      },
    });
  },
});
