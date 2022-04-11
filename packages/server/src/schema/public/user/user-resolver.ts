import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Ctx,
  Int
} from "type-graphql";
import { getConnection } from "typeorm";
import { UserEntity } from "../../../entities/UserEntity";
import { verify } from "jsonwebtoken";
import { Context } from "../../../context";
import { getKeyedHash } from "../../../services/getKeyedHash";
import { createAccessToken, createRefreshToken } from "../../../services/auth";
import { sendRefreshToken } from "../../../services/sendRefreshToken";

@ObjectType()
class LoginResponse {
    @Field()
    accessToken!: string;
    @Field(() => UserEntity)
    user!: UserEntity;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return "hi!";
  }


  @Query(() => [UserEntity])
  users() {
    return UserEntity.find();
  }

  @Query(() => UserEntity, { nullable: true })
  me(@Ctx() context: Context) {
    const authorization = context.req.headers["authorization"];

    if (!authorization) {
      return null;
    }

    try {
      const token = authorization.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
      return UserEntity.findOne(payload.userId);
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: Context) {
    sendRefreshToken(res, "");

    return true;
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokensForUser(@Arg("userId", () => Int) userId: string) {
    await getConnection()
      .getRepository(UserEntity)
      .increment({ id: userId }, "tokenVersion", 1);

    return true;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: Context
  ): Promise<LoginResponse> {
    const user = await UserEntity.findOne({ where: { email } });

    if (!user) {
      throw new Error("could not find user");
    }

    // return invalid if user has no password associated with his account
    if (!user.passwordSalt || !user.passwordHash) {
    throw new Error("Password could not be found, this should not happen");
    }

    // check that provided password matches stored password
    const passwordHash = getKeyedHash(password, user.passwordSalt);
    const isPasswordCorrect = passwordHash === user.passwordHash;

    if(!isPasswordCorrect) {
    throw new Error("bad password");

    }
    // login successful

    sendRefreshToken(res, createRefreshToken(user));

    return {
      accessToken: createAccessToken(user),
      user
    };
  }
}
