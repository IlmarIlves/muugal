import { arg, mutationField } from "@nexus/schema";
import { verify } from "jsonwebtoken";
// import { verify } from "jsonwebtoken";
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

    console.log('before uploadFile')
    
    const upload = await uploadFile(file.createReadStream(), file.mimetype);

    console.log('before entity')

    const order = new OrderEntity();

    order.userId = user.id;
    order.email = "payload.userId";
    order.telephone = "payload.userId";
    order.colors = "payload.userId";
    order.amount = 1;
    order.additionalInfo = "1";
    try {
      order.data = upload.Body;
      order.mimeType = upload.ContentType;
      
    } catch (error) {
      console.log(error);
    }
    

    console.log("order1", order);
    try {
      
      await order.save();
    } catch (error) {
      
      console.log(error);
    }

    console.log(await OrderEntity.find());

    return order;
  },
});
