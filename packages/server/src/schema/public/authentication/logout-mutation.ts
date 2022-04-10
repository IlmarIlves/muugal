import { mutationField } from "@nexus/schema";


export default mutationField("logout", {
  type: "Boolean",
  description: "Logs out signed-in user if any",
  resolve: (_parent, _args, context) => {
    const { viewer } = context;

    // user was already logged out, return false
    // if (!viewer) {
    //   return false;
    // }

    // log out existing user if any
    context.req.session.userId = null;

    // user was successfully logged out
    return true;
  },
});
