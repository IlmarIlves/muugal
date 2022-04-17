import { objectType } from "@nexus/schema";

export default objectType({
  name: "Payment",
  definition(t) {
    t.id("id", { description: "Payment unique id" });
  },
});
