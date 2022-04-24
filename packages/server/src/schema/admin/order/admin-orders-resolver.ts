import { extendType, inputObjectType } from "@nexus/schema";
import { JSONSchema4 } from "json-schema";
import { validate } from "../../../../lib/validate/validate";
import { OrderEntity } from "../../../entities/OrderEntity";
import { UserEntity, UserRole } from "../../../entities/UserEntity";
import { getFilterWhere } from "../../../services/getFilterWhere";
import { getPaginationOptions } from "../../../services/getPaginationOptions";



export default extendType({
  type: "Admin",
  definition(t) {
    t.field("users", {
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
