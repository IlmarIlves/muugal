import { enumType } from "@nexus/schema";
import { UserStatus } from "../../../entities/UserEntity";

export default enumType({
  name: "UserStatusEnum",
  members: Object.keys(UserStatus),
});
