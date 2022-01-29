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

    const user = await UserEntity.findOne({ where: { email } });

 
    const valid = password == user.passwordHash;

    console.log(context);

    return user ;
  },
});
