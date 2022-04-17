import { CustomValidator } from "../../lib/validate/customValidator";
import { UserEntity } from "../entities/UserEntity";

export function validateUniqueEmail(): CustomValidator<string> {
  return {
    async: true,
    name: "unique-email",
    validate: async (email: string) => {
      // do not allow letter case differences here
      const normalizedEmail = email.trim().toLowerCase();

      const user = await UserEntity.createQueryBuilder("user")
        .where("LOWER(TRIM(user.email)) = :normalizedEmail", { normalizedEmail })
        .getOne();

      return user === undefined;
    },
    formatError: (_error) => {
      return `User with given email address already exists`;
    },
  };
}
