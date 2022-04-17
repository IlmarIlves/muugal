import { arg, mutationField } from "@nexus/schema";
import { verify } from "jsonwebtoken";
import { UnauthorizedError } from "../../../../lib/validate/UnauthorizedError";
import { OrderEntity } from "../../../entities/OrderEntity";
import { UserEntity } from "../../../entities/UserEntity";
import { Upload } from "../../../scalars/UploadScalar";
import { uploadFile } from "../../../services/uploadFile";

export default mutationField("uploadFile", {
  type: "Viewer",
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

    const user = await UserEntity.findOne({id: payload.userId})

    const order = new OrderEntity;
    order.userId = payload.userId;
    order.data = upload.Body;
    order.mimeType = upload.ContentType;
    

    return context.viewer;
  },
});
