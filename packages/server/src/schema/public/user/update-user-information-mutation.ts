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
    telephone: stringArg({ description: "User telephone" }),
    packageMachineLocation: stringArg({ description: "User package machine location" }),
  },
  resolve: async (_parent, args, { viewer }) => {
 
    const { userId, email, firstName, lastName, telephone, packageMachineLocation } = args;

    // find order
    const user = await UserEntity.findOne({ where: { id: userId } });

    // confirm correct number of users
    if (!user) {
        throw new Error(
            `Expected to find order ${user} to update but not found, this should not happen`,
        );
    }

  
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.telephone = telephone;
    user.packageMachineLocation = packageMachineLocation;
    

    await user.save();


    return user;
  },
});
