import { Field, ObjectType } from "type-graphql";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, Index, OneToMany} from "typeorm";
import { generateRandomString } from "../services/generateRandomString";
import { getKeyedHash } from "../services/getKeyedHash";
import { fieldLength } from "../validators/constants";
import { FileEntity } from "./FileEntity";

export interface RegisterUserInfo {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }

export enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN",
}

export enum UserStatus {
    ACTIVE = "ACTIVE",
    DEACTIVATED = "DEACTIVATED",
    DISABLED = "DISABLED",
  }

  @Entity({ name: 'user' })
  @ObjectType()
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    readonly id!: string;

    @Column({ type: "varchar", nullable: true })
    stripeCustomerId!: string | null;

    @Field()
    @Column({ type: "varchar", length: fieldLength.email })
    email!: string;
    
    @Index()
    @Column({ type: "varchar", length: fieldLength.medium })
    firstName!: string;
    
    @Index()
    @Column({ type: "varchar", length: fieldLength.medium })
    lastName!: string;

    @Column({ type: "varchar", length: fieldLength.hash, nullable: true })
    passwordSalt!: string | null;
  
    @Column({ type: "varchar", length: fieldLength.hash, nullable: true })
    passwordHash!: string | null;

    @Column({type: "enum", enum: UserRole, default: UserRole.USER})
    userRole: UserRole;

    @Column({type: "enum", enum: UserStatus, default: UserStatus.ACTIVE})
    userStatus: UserStatus;

    @OneToMany(() => FileEntity, file => file.user)
    file: Promise<FileEntity[]>;

    static async register(info: RegisterUserInfo): Promise<UserEntity> {
        const passwordSalt = generateRandomString(fieldLength.hash);
        const passwordHash = getKeyedHash(info.password, passwordSalt);
    
        const user = await UserEntity.create({
          email: info.email.toLowerCase(),
          firstName: info.firstName,
          lastName: info.lastName,
          passwordSalt,
          passwordHash,
        }).save(); 
 
     return user;
   }



      
}


