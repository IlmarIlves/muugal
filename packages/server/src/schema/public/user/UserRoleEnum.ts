import { enumType } from "@nexus/schema";
import { UserRole } from "../../../entities/UserEntity";

export default enumType({
  name: "UserRoleEnum",
  members: Object.keys(UserRole),
});
