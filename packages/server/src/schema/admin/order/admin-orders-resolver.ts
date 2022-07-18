import { extendType} from "@nexus/schema";
import { OrderEntity } from "../../../entities/OrderEntity";
import { getPaginationOptions } from "../../../services/getPaginationOptions";



export default extendType({
  type: "Admin",
  definition(t) {
    t.field("adminOrders", {
      type: "AdminOrders",
      description: "List of users",

      resolve: async (_parent, args, _context) => {
    
        // get pagination options
        const { skip, take } = getPaginationOptions(args.pagination);

        // build query
        const query = OrderEntity.getRepository().createQueryBuilder("order");

   
        // fetch results with count
        const [orders, total] = await query.getManyAndCount();

        // return matches and pagination metadata
        return {
          skip,
          take,
          total,
          orders,
        };
      },
    });
  },
});
