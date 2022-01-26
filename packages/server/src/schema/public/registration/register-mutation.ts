import { mutationField, stringArg } from "nexus";
import { UserEntity } from "../../../entities/UserEntity";
import { getKeyedHash } from "../../../services/getKeyedHash";
import { Viewer } from "../viewer/ViewerType";

export default mutationField("register", {
    type: Viewer,
    description: "Registers new user",
    args: {
      firstName: stringArg({ description: "First name" }),
      lastName: stringArg({ description: "Last name" }),
      userName: stringArg({ description: "Username" }),
      email: stringArg({ description: "Email address" }),
      password: stringArg({ description: "Password" }),
    },
    resolve: async (_parent, args, context) => {
      // log out existing user if any
    //   context.logout();
  
      // extract arguments
      const { firstName, lastName, email, password, userName} = args;
  
      
  
      // register user
      const user = await UserEntity.register({
        firstName,
        lastName,
        email,
        password,
        userName
      });
  
      // TODO: actually handle giftCode, currently just stored with the user
  
      // check if user has password associated with his account
      /* istanbul ignore next */
      if (!user.passwordSalt || !user.passwordHash) {
        throw new Error("Created user does not have password set, this should not happen");
      }
  
      // calculate salted password hash
      const passwordHash = getKeyedHash(password, user.passwordSalt);
      const isPasswordCorrect = passwordHash === user.passwordHash;
  
      // throw if password is incorrect (should have failed validation)
      /* istanbul ignore next */
      if (!isPasswordCorrect) {
        throw new Error("Password passed validation but the password is incorrect, this should not happen");
      }
  
  
      // return logged in user info
      return user;
    },
  });