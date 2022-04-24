import { extendType } from "@nexus/schema";
import { PaymentEntity } from "../../../entities/PaymentEntity";
import { getPaginationOptions } from "../../../services/getPaginationOptions";


export default extendType({
  type: "Admin",
  definition(t) {
    t.field("payments", {
      type: "AdminPayments",
      description: "List of users",

      resolve: async (_parent, args, _context) => {


        // get pagination options
        const { skip, take } = getPaginationOptions(args.pagination);

        // build query
        const query = PaymentEntity.getRepository().createQueryBuilder("payment");


        // fetch results with count
        const [payments, total] = await query.getManyAndCount();

        // return matches and pagination metadata
        return {
          skip,
          take,
          total,
          payments,
        };
      },
    });
  },
});
