import { extendType } from "@nexus/schema";
import { verify } from "jsonwebtoken";
import { OrderEntity } from "../../../entities/OrderEntity";

export default extendType({
  type: "Query",
  definition(t) {
    t.list.field("orders", {
      type: "Order",
      description: "List of orders",
      resolve: async (_parent, _args, context) => {
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

        const orders = await OrderEntity.find({where: {userId: payload.userId}});

        console.log(orders);
        
        return orders;
      },
    });
  },
});
