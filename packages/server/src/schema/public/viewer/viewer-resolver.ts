import { queryField } from "nexus";
import { Session } from "../../../entities/Session";
import { UserEntity } from "../../../entities/UserEntity";
import { UserType } from "../user/UserType";

export default queryField("viewer", {
    type: UserType,
    description: "Query viewer",
    resolve: async (_parent, _args, context) => {

      console.log(context.req.sessionID);

      console.log("viewer resolver", context.req.session.userId);

      if(!context) {
        return null;
      }

      if(!context.req) {
        return null;
      }

      if(!context.req.sessionID) {
        return null;
      }

      const session = await Session.findOne({where: {id: context.req.sessionID}});
      
      return UserEntity.findOne({id: session.userId});
    },
  });