import { extendType} from "@nexus/schema";
import { OffersEntity } from "../../../entities/OffersEntity";
import { getPaginationOptions } from "../../../services/getPaginationOptions";



export default extendType({
  type: "Admin",
  definition(t) {
    t.field("offers", {
      type: "AdminOffers",
      description: "List of offers",

      resolve: async (_parent, args, _context) => {
    
        // get pagination options
        const { skip, take } = getPaginationOptions(args.pagination);

        // build query
        const query = OffersEntity.getRepository().createQueryBuilder("offer");

   
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
