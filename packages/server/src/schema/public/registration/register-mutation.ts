import {  arg, booleanArg, mutationField,  stringArg } from "@nexus/schema";
import { JSONSchema4 } from "json-schema";
import { validate } from "../../../../lib/validate/validate";
import { fieldLength } from "../../../constants";
import { UserEntity } from "../../../entities/UserEntity";
import { getKeyedHash } from "../../../services/getKeyedHash";
import { sendUserReigisterEmail } from "../../../services/sendUserRegisteredEmail";

const schema: JSONSchema4 = {
  $async: true,
  type: "object",
  properties: {
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
    firstName: {
      title: "First name",
      type: "string",
      minLength: 1,
      maxLength: fieldLength.medium,
    },
    lastName: {
      title: "Last name",
      type: "string",
      minLength: 1,
      maxLength: fieldLength.medium,
    },
    telephone: {
      title: "Telephone",
      type: "string",
    },
    packageMachineLocation: {
      title: "Package machine location",
      type: "string",
    },
    password: {
      title: "Password",
      type: "string",
      // format: "strong-password",
      minLength: 8,
    },
    isUserBuyer: {
      title: "Is user buyer",
      type: "boolean",
    },
    isUserOfferer: {
      title: "Is user offerer",
      type: "boolean",
    },
  },
  required: ["firstName", "lastName", "telephone", "packageMachineLocation", "email", "password", "isUserOfferer", "isUserBuyer"],
};

export default mutationField("registerUser", {
  type: "User",
  description: "Registers new user",
  args: {
    userRole: arg({ type: "UserRoleEnum", description: "New user status" }),
    firstName: stringArg({ description: "First name" }),
    lastName: stringArg({ description: "Last name" }),
    email: stringArg({ description: "Email address" }),
    telephone: stringArg({ description: "Telephone" }),
    packageMachineLocation: stringArg({ description: "Package machine location" }),
    password: stringArg({ description: "Password" }),
    isUserOfferer: booleanArg({ description: "Is user Offerer" }),
    isUserBuyer: booleanArg({ description: "Is user Buyer" }),
  },
  resolve: async (_parent, args, _context) => {
    // extract arguments
    const { userRole, email, firstName, lastName, telephone, packageMachineLocation, password, isUserOfferer, isUserBuyer } = args;

    // validate arguments
    await validate(args, schema);

    // register user
    const user = await UserEntity.register({
      firstName,
      lastName,
      email,
      telephone,
      packageMachineLocation,
      password,
      userRole: userRole,
      isUserBuyer: isUserBuyer,
      isUserOfferer: isUserOfferer,
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

    try {
      
      await sendUserReigisterEmail({ name: user.firstName, email: user.email });

      console.log(
        
        "registered new user email sent",
      );
    } catch (error) {
      console.log(
        {
          error
        },
        "registered new user email error", 
      );
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