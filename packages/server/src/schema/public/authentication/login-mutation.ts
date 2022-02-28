import { mutationField, stringArg } from "@nexus/schema";
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

    const user = await UserEntity.findOne({ where: { email, userStatus: UserStatus.ACTIVE } });

    // if (password != user.passwordHash) {
    //   throw new Error("Password is incorrect");
    // }   

    if (!user) {
      throw new Error("Email passed validation but the user could not be found, this should not happen");
    }

    // login user (logged in user id is stored in session)
    context.req.session.userId = user.id;

    // return logged in user info
    return user;
  },
});
