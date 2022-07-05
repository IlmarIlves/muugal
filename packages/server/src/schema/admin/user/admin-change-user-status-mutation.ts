import { mutationField, idArg } from "@nexus/schema";
import { UserEntity } from "../../../entities/UserEntity";


export default mutationField("updateOrderStatus", {
  type: 'AdminUser',
  description: "Updates user status",
  args: {
    userId: idArg({ description: "User identifier" }),
    // userStatus: arg({ type: "UserStatus", description: "User status" }),
  },
  resolve: async (_parent, args, { viewer }) => {
 
    const { userId, userStatus } = args;

    // find order
    const user = await UserEntity.findOne({ where: { id: userId } });

    // confirm correct number of users
    if (!user) {
        throw new Error(
            `Expected to find order ${user} to update but not found, this should not happen`,
        );
    }

    user.userStatus = userStatus;


    await user.save();


    return user;
  },
});
