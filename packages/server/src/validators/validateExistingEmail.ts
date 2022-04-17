import { CustomValidator } from "../../lib/validate/customValidator";
import { UserEntity, UserStatus } from "../entities/UserEntity";

export function validateExistingEmail(userStatus?: UserStatus): CustomValidator<string> {
  return {
    async: true,
    name: "existing-email",
    validate: async (email: string) => {
      // Allow users to insert uppercase letters and trailing space. Remove it here.
      const normalizedEmail = email.trim().toLowerCase();

      // set up user query
      const userQuery = UserEntity.createQueryBuilder("user").where("LOWER(TRIM(user.email)) = :normalizedEmail", {
        normalizedEmail,
      });

      // add status to query when specified
      if (userStatus) {
        userQuery.andWhere("status = :userStatus", { userStatus });
      }

      // attempt to find user
      const user = await userQuery.getOne();

      return user !== undefined;
    },
    formatError: (_error) => {
      return `No account with given email exists`;
    },
  };
}
