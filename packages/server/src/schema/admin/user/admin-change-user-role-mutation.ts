import { mutationField, arg, idArg } from "@nexus/schema";
import { UserEntity } from "../../../entities/UserEntity";


export default mutationField("updateOrderStatus", {
  type: 'AdminUser',
  description: "Updates user status",
  args: {
    userId: idArg({ description: "User identifier" }),
    userRole: arg({ type: "UserRoleEnum", description: "User role" }),
  },
  resolve: async (_parent, args, { viewer }) => {
 
    const { userId, userRole } = args;

    // find order
    const user = await UserEntity.findOne({ where: { id: userId } });

    // confirm correct number of users
    if (!user) {
        throw new Error(
            `Expected to find order ${user} to update but not found, this should not happen`,
        );
    }

    user.userRole = userRole;


    await user.save();


    return user;
  },
});
