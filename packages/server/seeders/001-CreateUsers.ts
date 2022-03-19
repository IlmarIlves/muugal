import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { UserEntity, UserStatus, UserRole } from "../src/entities/UserEntity";
import { generateRandomString } from "../src/services/generateRandomString";
import { getKeyedHash } from "../src/services/getKeyedHash";
import { fieldLength } from "../lib/validate/constants";

const users: Partial<UserEntity>[] = [

  {
    firstName: "Ilmar",
    lastName: "Ilves",
    email: "ilmar@stagnationlab.com",
  },

];

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection) {
    const userEntities: UserEntity[] = [];
    const passwordSalt = generateRandomString(fieldLength.hash);
    const passwordHash = getKeyedHash("12345678", passwordSalt);

    // create predefined example/test users
    for (const userInfo of users) {
      const user = new UserEntity();

      // set base info
      user.passwordSalt = passwordSalt;
      user.passwordHash = passwordHash;
      user.userStatus = UserStatus.ACTIVE;
      user.userRole = UserRole.ADMIN;
    

      // augment with example info
      Object.assign(user, userInfo);

      userEntities.push(user);
    }

    await connection.manager.save(userEntities);

    // create another bunch of random users
    await factory(UserEntity)().createMany(20);
  }
}
