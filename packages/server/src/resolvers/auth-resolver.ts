import { Arg, Ctx, Mutation, Resolver, Query } from "type-graphql";
import { UserEntity } from "../entities/UserEntity";
import { AuthInput } from "../graphql-types/AuthInput";
import { MyContext } from "../graphql-types/MyContext";
import { UserResponse } from "../graphql-types/UserResponse";
import { generateRandomString } from "../services/generateRandomString";
import { getKeyedHash } from "../services/getKeyedHash";
import { fieldLength } from "../validators/constants";

declare module 'express-session' {
  interface Session {
      userId: string
  }
}

const invalidLoginResponse = {
  errors: [
    {
      path: "email",
      message: "invalid login"
    }
  ]
};

@Resolver()
export class AuthResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg("input")
    { email, password }: AuthInput
  ): Promise<UserResponse> {

    const existingUser = await UserEntity.findOne({ email });

    if (existingUser) {
      return {
        errors: [
          {
            path: "email",
            message: "already in use"
          }
        ]
      };
    }

    const passwordSalt = generateRandomString(fieldLength.hash);
    const passwordHash = getKeyedHash(password, passwordSalt);

    const user = await UserEntity.create({
      email,
      passwordHash: passwordHash
    }).save();

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("input") { email, password }: AuthInput,
    @Ctx() ctx: MyContext
  ): Promise<UserResponse> {
    const user = await UserEntity.findOne({ where: { email } });

    if (!user) {
      return invalidLoginResponse;
    }

    const valid = password == user.passwordHash;

    if (!valid) {
      return invalidLoginResponse;
    }

    ctx.req.session!.userId = user.id;

    return { user };
  }

  @Query(() => UserEntity, { nullable: true })
  async me(@Ctx() ctx: MyContext): Promise<UserEntity | undefined> {
    if (!ctx.req.session!.userId) {
      return undefined;
    }

    return UserEntity.findOne(ctx.req.session!.userId);
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: MyContext): Promise<Boolean> {
    return new Promise((res, rej) =>
      ctx.req.session!.destroy(err => {
        if (err) {
          console.log(err);
          return rej(false);
        }

        ctx.res.clearCookie("qid");
        return res(true);
      })
    );
  }
}