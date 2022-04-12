import { mutationField } from "@nexus/schema";
import { sendRefreshToken } from "../../../services/sendRefreshToken";

export default mutationField("logout", {
  type: "Boolean",
  description: "Logs out signed-in user if any",
  resolve: (_parent, _args, context) => {
    sendRefreshToken(context.res, "");

    return true;
  },
});
