import { extendType, idArg } from "@nexus/schema";
import { JSONSchema4 } from "json-schema";
import { validate } from "../../../../lib/validate/validate";
import { PaymentEntity } from "../../../entities/PaymentEntity";

const schema: JSONSchema4 = {
  $async: true,
  type: "object",
  properties: {
    userId: {
      title: "User id",
      description: "User id to get info about",
      type: "string",
    },
  },
};

export default extendType({
  type: "Admin",
  definition(t) {
    t.field("payment", {
      type: "AdminPayment",
      description: "Admin payment by id",
      args: {
        paymentId: idArg({ description: "Payment identifier" }),
      },
      resolve: async (_parent, args, _context) => {
        await validate(args, schema);

        const { paymentId } = args;

        const payment = await PaymentEntity.findOne({ where: { id: paymentId } });

        if (!payment) {
          throw new Error("Fetch payment by id passed validation but could not be found, this should not happen");
        }

        return payment;
      },
    });
  },
});
