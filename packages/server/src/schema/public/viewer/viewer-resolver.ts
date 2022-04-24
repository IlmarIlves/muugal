import { verify } from "jsonwebtoken";
import { queryField } from "nexus";
import { UserEntity } from "../../../entities/UserEntity";
import { UserType } from "../user/UserType";

export default queryField("viewer", {
    type: UserType,
    nullable: true,
    description: "Query viewer",
    resolve: async (_parent, _args, context) => {

      // const authorization = context.req.headers["authorization"];

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
      return user;
    },
  });