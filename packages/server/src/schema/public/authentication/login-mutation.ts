import { mutationField, stringArg } from "@nexus/schema";
import { JSONSchema4 } from "json-schema";
import { UserEntity, UserStatus } from "../../../entities/UserEntity";

declare module 'express-session' {
    interface Session {
        userId: string
    }
  }


export default mutationField("login", {
  type: "Viewer",
  description: "Attempts to log user in",
  args: {
    email: stringArg({ description: "Email address" }),
    password: stringArg({ description: "Password" }),
  },
  resolve: async (_parent, args, context) => {
    // extract arguments
    const { email, password } = args;

    console.log(context.req.session);

    const user = await UserEntity.findOne({ where: { email } });
    
    const valid = password == user.passwordHash;

    context.req.session.userId = user.id;

    console.log("after login", context.req.session);


    return user ;
  },
});
