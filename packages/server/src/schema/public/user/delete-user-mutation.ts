import { mutationField } from "@nexus/schema";

export default mutationField("delete", {
  type: "Boolean",
  description: "Logs out signed-in user if any",
  resolve: async (_parent, _args, {viewer}) => {
    await viewer.deleteUser();

    return true;
  },
});

