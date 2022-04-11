import { mutationField, objectType, stringArg } from "@nexus/schema";
import { JSONSchema4 } from "json-schema";
import { validate } from "../../../../lib/validate/validate";
import { UserEntity, UserStatus } from "../../../entities/UserEntity";
import { validatePassword } from "../../../validators/validatePassword";
import { sign } from "jsonwebtoken";
import { Context } from "../../../context";
import { sendRefreshToken } from "../../../services/sendRefreshToken";
import { createRefreshToken } from "../../../services/auth";

export const LoginResponse = objectType({
	name: 'LoginResponse',
	definition(t) {
		t.string('accessToken');
	},
});


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
  type: "LoginResponse",
  description: "Attempts to log user in",
  args: {
    email: stringArg({ description: "Email address" }),
    password: stringArg({ description: "Password" }),
  },
  resolve: async (_parent, args, context: Context) => {
    // extract arguments
    const { email } = args;

    // validate arguments
    await validate(args, schema, [validatePassword(email)]);

    // attempt to find active user by email
    const user = await UserEntity.findOne({
      where: {
        email,
        status: UserStatus.ACTIVE,
      },
    });
    
    // throw if no such user could be found
    /* istanbul ignore next */
    if (!user) {
      throw new Error("Email passed validation but the user could not be found, this should not happen");
    }
    
  
    // login successful
    sendRefreshToken(context.res, createRefreshToken(user));
      
    // login user (logged in user id is stored in session)
    // context.req.session.userId = user.id;

    console.log(
      {
        user,
      },
      "user logged in",
    );

    return {accessToken: sign(
        { userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "7d" }
    )};
  },
});