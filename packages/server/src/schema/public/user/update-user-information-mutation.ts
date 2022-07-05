import { mutationField, idArg, stringArg } from "@nexus/schema";
import { UserEntity } from "../../../entities/UserEntity";


export default mutationField("updateOrderStatus", {
  type: 'User',
  description: "Updates user status",
  args: {
    userId: idArg({ description: "User identifier" }),
    email: stringArg({ description: "User email" }),
    firstName: stringArg({ description: "User email" }),
    lastName: stringArg({ description: "User email" }),
  },
  resolve: async (_parent, args, { viewer }) => {
 
    const { userId, email, firstName, lastName } = args;

    // find order
    const user = await UserEntity.findOne({ where: { id: userId } });

    // confirm correct number of users
    if (!user) {
        throw new Error(
            `Expected to find order ${user} to update but not found, this should not happen`,
        );
    }

    if (email !== undefined && email !== null) {
      user.email = email;
    }

    if (firstName !== undefined && firstName !== null) {
      user.firstName = firstName;
    }

    if (lastName !== undefined && lastName !== null) {
      user.lastName = lastName;
    }

    await user.save();


    return user;
  },
});
