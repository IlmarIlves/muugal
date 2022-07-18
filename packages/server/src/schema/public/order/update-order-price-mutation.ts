import { mutationField, idArg, intArg } from "@nexus/schema";
import { OrderEntity} from "../../../entities/OrderEntity";


export default mutationField("updateOrderPrice", {
  type: 'Order',
  description: "Updates user status",
  args: {
    orderId: idArg({ description: "Order identifier" }),
    offererUserId: intArg({ description: "Order price" }),
    priceInCents: intArg({ description: "Order price" }),
    finishedInDays: intArg({ description: "Order finished in days" }),
  },
  resolve: async (_parent, args) => {
 
    const { orderId, priceInCents, finishedInDays, offererUserId } = args;

    // find order
    const order = await OrderEntity.findOne({ where: { id: orderId } });

    // confirm correct number of users
    if (!order) {
        throw new Error(
            `Expected to find order ${orderId} to update but not found, this should not happen`,
        );
    }

    order.offererUserId = offererUserId;
    order.priceInCents = priceInCents;
    order.finishedInDays = finishedInDays;

    await order.save();


    return order;
  },
});
