import { mutationField, arg, idArg } from "@nexus/schema";
import { OrderEntity} from "../../../entities/OrderEntity";


export default mutationField("updateOrderStatus", {
  type: 'Order',
  description: "Updates user status",
  args: {
    orderId: idArg({ description: "Order identifier" }),
    status: arg({ type: "OrderProgressStatusEnum", description: "New user status" }),
  },
  resolve: async (_parent, args) => {
 
    const { orderId } = args;

    // find order
    const order = await OrderEntity.findOne({ where: { id: orderId } });

    // confirm correct number of users
    if (!order) {
        throw new Error(
            `Expected to find order ${orderId} to update but not found, this should not happen`,
        );
    }

    // order.status = status as OrderProgressStatus;

    await order.save();


    return order;
  },
});
