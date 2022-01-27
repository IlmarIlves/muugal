import { ObjectType, Field } from "type-graphql";
import { UserEntity } from "../entities/UserEntity";
import { FieldError } from "./FieldError";

@ObjectType()
export class UserResponse {
  @Field(() => UserEntity, { nullable: true })
  user?: UserEntity;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}