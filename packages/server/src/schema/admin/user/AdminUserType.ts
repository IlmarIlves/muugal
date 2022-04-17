import { objectType } from "@nexus/schema";

export default objectType({
  name: "AdminUser",
//   rootTyping: getRootTypingImport("UserEntity"),
  definition(t) {
    t.id('id');
    t.string('email');
    t.string('firstName');
    t.string('lastName');
    t.list.field('userRole', {type: "UserRoleEnum", description: "User role"});
    t.field('userStatus', {type: "UserStatusEnum", description: "User status"});
  },
});
