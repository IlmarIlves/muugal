import { verify } from "jsonwebtoken";
import { queryField } from "nexus";
import { UserEntity } from "../../../entities/UserEntity";
import { UserType } from "../user/UserType";

export default queryField("viewer", {
    type: UserType,
    description: "Query viewer",
    resolve: async (_parent, _args, context) => {

      const token = context.req.cookies.jid;

      if(!token) {
        return context.res.send({ok: false, accessToken: ''})
      }
  
      let payload: any = null ;
      try {
        payload = verify(token, process.env.REFRESH_TOKEN_SECRET!)
      } catch (error) {
        console.log(error);
        return context.res.send({ok: false, accessToken: ''})
      }
  
      const user = await UserEntity.findOne({id: payload.userId})
      return user;
    },
  });