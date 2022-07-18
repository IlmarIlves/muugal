import { arg, intArg, mutationField, stringArg } from "@nexus/schema";
import { verify } from "jsonwebtoken";
import { OrderEntity } from "../../../entities/OrderEntity";
import { UserEntity } from "../../../entities/UserEntity";
import { Upload } from "../../../scalars/UploadScalar";
import { uploadFile } from "../../../services/uploadFile";

// const schema: JSONSchema4 = {
//   $async: true,
//   type: "object",
//   properties: {
//     telephone: {
//       title: "Orderer telephone",
//       type: "string",
//     },
//     email: {
//       title: "Orderer email",
//       type: "string",
//     },
//     amount: {
//       title: "Orderer email",
//       type: "number",
//     },
//     additionalInfo: {
//       title: "Orderer email",
//       type: "string",
//     },
//   },
// };


export default mutationField("order", {
  type: "Order",
  description: "Creates order",
  args: {
    file: arg({ type: Upload, description: "Upload file" }),
    telephone: stringArg({ description: "Telephone" }),
    email: stringArg({ description: "Email" }),
    colors: arg({type: "OrderColorsEnum", description: "Order available colors" }),
    amount: intArg({ description: "Amount" }),
    additionalInfo: stringArg({ description: "Additional information" }),
  },
  resolve: async (_parent, args, context) => {
    // await validate(args, schema);

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

    const user = await UserEntity.findOne({id: payload.userId})

    if(!user) {
      throw new Error("User not found, this should not happen");
      
    }

    const file = await args.file;

    const order = new OrderEntity();
    
    order.userId = user.id;
    order.email = args.email;
    order.telephone = args.telephone;
    order.colors = args.colors;
    order.amount = args.amount;
    order.additionalInfo = args.additionalInfo;

    const upload = await uploadFile(file.createReadStream(), file.mimetype);

    order.fileUrl = upload;

    
    await order.save();

    return order;
  },
});
