import { arg, mutationField } from "@nexus/schema";
import { verify } from "jsonwebtoken";
import { OrderEntity } from "../../../entities/OrderEntity";
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

      let payload: any = null ;
      try {
          payload = verify(token, process.env.REFRESH_TOKEN_SECRET!)
      } catch (error) {
          console.log(error);
          return context.res.send({ok: false, accessToken: ''})
      }

    const file = await args.file;
    
    const upload = await uploadFile(file.createReadStream(), file.mimetype);


    if(!token) {
        return context.res.send({ok: false, accessToken: ''})
    }

    // const user = await UserEntity.findOne({id: payload.userId})

    const order = new OrderEntity();

    order.userId = payload.userId;
    order.email = "payload.userId";
    order.telephone = "payload.userId";
    order.colors = "payload.userId";
    order.amount = 1;
    order.additionalInfo = "1";
    order.data = upload.Body;
    order.mimeType = upload.ContentType;
    
    await order.save();
    

    return order;
  },
});
