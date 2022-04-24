import { objectType } from "@nexus/schema";

export default objectType({
  name: "AdminOrder",
//   rootTyping: getRootTypingImport("UserEntity"),
  definition(t) {
    t.id('id');
    t.id('userId');
    t.string('email');
    t.string('telephone');
    t.string('colors', { description: "User role"});
    t.int('amount', { description: "User role"});
    t.string('additionalInfo', { description: "User role"});
    t.string('data');
    t.string('mimeType');
  },
});
