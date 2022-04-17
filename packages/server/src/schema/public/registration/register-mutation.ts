import {  mutationField,  stringArg } from "@nexus/schema";
import { JSONSchema4 } from "json-schema";
import { validate } from "../../../../lib/validate/validate";
import { fieldLength } from "../../../constants";
import { UserEntity, UserRole } from "../../../entities/UserEntity";
import { getKeyedHash } from "../../../services/getKeyedHash";

const schema: JSONSchema4 = {
  $async: true,
  type: "object",
  properties: {
    name: {
      title: "Name",
      type: "string",
      minLength: 1,
      maxLength: fieldLength.medium,
    },
    email: {
      title: "Email",
      type: "string",
      maxLength: fieldLength.email,
      allOf: [
        {
          format: "email",
        },
        {
          format: "unique-email",
        },
      ],
    },
    password: {
      title: "Password",
      type: "string",
      // format: "strong-password",
      minLength: 8,
    },
  },
  required: ["firstName", "lastName", "email", "password"],
};

export default mutationField("register", {
  type: "User",
  description: "Registers new user",
  args: {
    firstName: stringArg({ description: "First name" }),
    lastName: stringArg({ description: "Last name" }),
    email: stringArg({ description: "Email address" }),
    password: stringArg({ description: "Password" }),
  },
  resolve: async (_parent, args, _context) => {
    // extract arguments
    const { firstName, lastName, email, password } = args;

    // validate arguments
    await validate(args, schema);

    // register user
    const user = await UserEntity.register({
      firstName,
      lastName,
      email,
      password,
      userRole: [UserRole.USER],
    });


    // check if user has password associated with his account
    if (!user.passwordSalt || !user.passwordHash) {
      throw new Error("Created user does not have password set, this should not happen");
    }

    // calculate salted password hash
    const passwordHash = getKeyedHash(password, user.passwordSalt);
    const isPasswordCorrect = passwordHash === user.passwordHash;

    if (!isPasswordCorrect) {
      throw new Error("Password passed validation but the password is incorrect, this should not happen");
    }

    console.log(
      {
        email,
        user,
      },
      "registered new user",
    );

    // return logged in user info
    return user;
  },
});