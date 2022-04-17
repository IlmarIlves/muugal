import { objectType } from "@nexus/schema";

export default objectType({
  name: "AdminUsers",
  definition(t) {
    t.int("skip");
    t.int("take");
    t.int("total");
    t.list.field("users", {
      type: "AdminUser",
      description: "List of paginated users",
    });
  },
});
