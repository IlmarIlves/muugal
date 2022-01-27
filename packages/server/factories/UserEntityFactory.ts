import { define } from "typeorm-seeding";
import { UserEntity, UserStatus } from "../src/entities/UserEntity";
import { generateRandomString } from "../src/services/generateRandomString";
import { getKeyedHash } from "../src/services/getKeyedHash";
import { fieldLength } from "../src/validators/constants";

define(UserEntity, (faker) => {
  const gender = faker.random.number(1);
  const firstName = faker.name.firstName(gender);
  const lastName = faker.name.lastName(gender);
  const email = faker.internet.email(firstName, lastName).toLowerCase();
  const isBabyBorn = faker.random.boolean();

  const passwordSalt = generateRandomString(fieldLength.hash);
  const passwordHash = getKeyedHash(faker.internet.password(8), passwordSalt);

  const user = new UserEntity();

  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;
  user.passwordHash = passwordHash;
  user.passwordSalt = passwordSalt;
  user.userStatus = faker.random.arrayElement([UserStatus.ACTIVE, UserStatus.DEACTIVATED, UserStatus.DISABLED]);

  return user;
});
