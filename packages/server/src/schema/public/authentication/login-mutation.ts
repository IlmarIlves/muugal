import { mutationField, stringArg } from "@nexus/schema";
import { JSONSchema4 } from "json-schema";
import { Session } from "../../../entities/Session";
import { UserEntity, UserStatus } from "../../../entities/UserEntity";

const schema: JSONSchema4 = {
  $async: true,
  type: "object",
  properties: {
    email: {
      title: "Email",
      type: "string",
      format: "email",
    },
    password: {
      title: "Password",
      type: "string",
      format: "valid-password",
    },
  },
  required: ["email", "password"],
};


export default mutationField("login", {
  type: "Viewer",
  description: "Attempts to log user in",
  args: {
    email: stringArg({ description: "Email address" }),
    password: stringArg({ description: "Password" }),
  },
  resolve: async (_parent, args, context) => {
    // extract arguments
    const { email } = args;

    const user = await UserEntity.findOne({ where: { email, userStatus: UserStatus.ACTIVE } });

    if (!user) {
      throw new Error("Email passed validation but the user could not be found, this should not happen");
    }

    const session = await Session.findOne({where: {id: context.req.sessionID}});

    session.userId = user.id;

    // return logged in user info
    return user;
  },
});
