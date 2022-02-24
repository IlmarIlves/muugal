import { mutationField } from "@nexus/schema";


export default mutationField("logout", {
  type: "Boolean",
  description: "Logs out signed-in user if any",
  resolve: (_parent, _args, context) => {
    const { viewer } = context;

    console.log(context.req.session.userId);

    // user was already logged out, return false
    // if (!viewer) {
    //   return false;
    // }

    // log out existing user if any
    context.req.session.userId = undefined;


    // user was successfully logged out
    return true;
  },
});
