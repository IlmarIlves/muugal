import { queryField } from "nexus";
import { UserEntity } from "../../../entities/UserEntity";
import { UserType } from "../user/UserType";

export default queryField("viewer", {
    type: UserType,
    description: "Query viewer",
    resolve: async (_parent, _args, context) => {

      // if(!context) {
      //   return null;
      // }

      // if(!context.req) {
      //   return null;
      // }

      // if(!context.req.session) {
      //   return null;
      // }

      // if(!context.req.session.userId) {
      //   return null;
      // }

    console.log("viewer sessionID", context.req.sessionID)
      // console.log('viewer', context.req);
      
      return await UserEntity.findOne({id: context.req.session.userId});
    },
  });