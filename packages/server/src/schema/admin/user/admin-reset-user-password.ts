import { idArg, mutationField } from "@nexus/schema";
import { JSONSchema4 } from "json-schema";
import { validate } from "../../../../lib/validate/validate";
import { fieldLength } from "../../../constants";
import { UserEntity } from "../../../entities/UserEntity";
import { generateRandomString } from "../../../services/generateRandomString";
import { getKeyedHash } from "../../../services/getKeyedHash";
import { sendPasswordResetEmail } from "../../../services/sendPasswordResetEmail";

const schema: JSONSchema4 = {
  $async: true,
  type: "object",
  properties: {
    userId: {
      title: "User id",
      description: "User id to reset password",
      type: "string",
      format: "existing-user",
    },
  },
  required: ["userId"],
};


export default mutationField("adminResetUserPassword", {
  type: "AdminUser",
  description: "Reset user password",
  args: {
    userId: idArg({ description: "User id" }),
  },
  resolve: async (_parent, args, { viewer }) => {

    await validate(args, schema);

    const user = await UserEntity.findOne({ where: { id: args.userId } });

    if (!user) {
      throw new Error("Find user by id passed validation but could not be found, this should not happen");
    }

    const newPassword = generateRandomPassword();

    const passwordSalt = generateRandomString(fieldLength.hash);
    const passwordHash = getKeyedHash(newPassword, passwordSalt);

    user.passwordSalt = passwordSalt;
    user.passwordHash = passwordHash;

    await user.save();

    await sendPasswordResetEmail({ name: user.firstName, email: user.email, generatedPassword: newPassword });

    return user;
  },
});

function generateRandomPassword(pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789") {
  let result = "";

  for (let i = 0; i <= 10; i++) {
    result += pool.charAt(Math.floor(Math.random() * pool.length));
  }

  return result;
}
