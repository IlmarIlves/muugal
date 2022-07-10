import { Field, ObjectType } from "type-graphql";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, Index, OneToMany, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { generateRandomString } from "../services/generateRandomString";
import { getKeyedHash } from "../services/getKeyedHash";
import { fieldLength } from "../../lib/validate/constants";
import { OrderEntity } from "./OrderEntity";
import { PaymentEntity } from "./PaymentEntity";

export interface RegisterUserInfo {
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    packageMachineLocation: string;
    password: string;
    userRole: UserRole;
    isUserBuyer: boolean;
    isUserOfferer: boolean;
  }

export enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN",
    BUYER = "BUYER",
    OFFERER = "OFFERER",
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

    @Index()
    @Column({type: "varchar"})
    telephone!: string

    @Column({type: "varchar"})
    packageMachineLocation!: string;

    @Column({ type: "varchar", length: fieldLength.hash, nullable: true })
    passwordSalt!: string | null;
  
    @Column({ type: "varchar", length: fieldLength.hash, nullable: true })
    passwordHash!: string | null;

    @Column({type: "enum", enum: UserRole, default: UserRole.USER})
    userRole!: UserRole;

    @Column({ type: "boolean", default: false })
    isUserBuyer!: boolean;

    @Column({ type: "boolean", default: false })
    isUserOfferer!: boolean;

    @Column({ type: "int", default: 0 })
    tokenVersion!: number;

    @Column({type: "enum", enum: UserStatus, default: UserStatus.ACTIVE})
    userStatus!: UserStatus;

    @OneToMany(() => PaymentEntity, payment => payment.user)
    payments!: Promise<PaymentEntity[]>;

    @OneToMany(() => OrderEntity, file => file.user)
    file!: Promise<OrderEntity[]>;

    @CreateDateColumn()
    createdDate!: Date;
  
    @UpdateDateColumn()
    updatedDate!: Date;

 

   static async register(info: RegisterUserInfo): Promise<UserEntity> {
    const passwordSalt = generateRandomString(fieldLength.hash);
    const passwordHash = getKeyedHash(info.password, passwordSalt);

    const user = await UserEntity.create({
      email: info.email,
      firstName: info.firstName,
      lastName: info.lastName,
      telephone: info.lastName,
      packageMachineLocation: info.packageMachineLocation,
      passwordSalt,
      passwordHash,
      userRole: info.userRole,
      isUserBuyer: info.isUserBuyer,
      isUserOfferer: info.isUserOfferer,
    }).save(); 

  return user;
  }    

  static async deleteUser() {
    await this.delete(this);
  }      
}


