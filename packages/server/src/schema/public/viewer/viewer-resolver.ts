import { queryField } from "nexus";
import { UserEntity } from "../../../entities/UserEntity";
import { UserType } from "../user/UserType";

export default queryField("viewer", {
    type: UserType,
    description: "Query viewer",
  
    resolve: async (_parent, _args, context) => {

      console.log(context.req.session.userId);

      if(!context) {
        return null;
      }

      if(!context.req) {
        return null;
      }

      if(!context.req.session) {
        return null;
      }
      
      return UserEntity.findOne({id: context.req.session.userId});
    },
  });