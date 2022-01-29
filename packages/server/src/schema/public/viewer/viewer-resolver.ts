import { queryField } from "nexus";
import { UserEntity } from "../../../entities/UserEntity";
import { UserType } from "../user/UserType";
import { Viewer } from "./ViewerType";

export default queryField("viewer", {
    type: UserType,
    description: "Query viewer",
  
    resolve: async (_parent, _args, context) => {

      if(!context) {
        return null;
      }

      if(!context.req) {
        return null;
      }
      

      return UserEntity.findOne(context.req.session.userId);
    },
  });