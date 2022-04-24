import { extendType } from "@nexus/schema";
import { PaymentEntity } from "../../../entities/PaymentEntity";


export default extendType({
  type: "Admin",
  definition(t) {
    t.field("payments", {
      type: "AdminUsers",
      description: "List of users",

      resolve: async (_parent, args, _context) => {


        // get pagination options

        // build query
        const query = PaymentEntity.getRepository().createQueryBuilder("payment");


        // fetch results with count
        const [payments, total] = await query.getManyAndCount();

        // return matches and pagination metadata
        return {
          total,
          payments,
        };
      },
    });
  },
});
