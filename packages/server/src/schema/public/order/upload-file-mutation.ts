import { arg, mutationField, } from "@nexus/schema";
import { verify } from "jsonwebtoken";
import { OrderEntity } from "../../../entities/OrderEntity";
import { UserEntity } from "../../../entities/UserEntity";
import { Upload } from "../../../scalars/UploadScalar";
import { uploadFile } from "../../../services/uploadFile";


export default mutationField("order", {
  type: "Order",
  description: "Uploads file",
  args: {
    file: arg({ type: Upload, description: "Upload file" }),
  },
  resolve: async (_parent, args, context) => {
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

    const upload = await uploadFile(file.createReadStream(), file.mimetype);

    const order = new OrderEntity();

    order.userId = user.id;
    order.email = args.email;
    order.telephone = args.telephone;
    order.colors = args.colors;
    order.amount = args.amount;
    order.additionalInfo = args.additionalInfo;
    order.fileUrl = upload;

    
    await order.save();

    return order;
  },
});
