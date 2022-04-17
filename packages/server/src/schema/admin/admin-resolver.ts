import { extendType } from "@nexus/schema";

export default extendType({
  type: "Query",
  definition(t) {
    t.field("admin", {
      type: "Admin",
      description: "Admin resolvers",
      resolve: () => ({}),
    });
  },
});
