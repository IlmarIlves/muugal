import { CustomValidator } from "../../lib/validate/customValidator";
import { UserEntity } from "../entities/UserEntity";

export function validateExistingUser(): CustomValidator<string> {
  return {
    async: true,
    name: "existing-user",
    validate: async (userId: string) => {
      const user = await UserEntity.findOne({ id: userId });

      return user !== undefined;
    },
    formatError: (_error) => {
      return `No account with given id does not exist`;
    },
  };
}
