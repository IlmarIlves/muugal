import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN",
}

export enum UserStatus {
    ACTIVE = "ACTIVE",
    DEACTIVATED = "DEACTIVATED",
    DISABLED = "DISABLED",
  }

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    userRole: UserRole;

    @Column()
    userStatus: UserStatus;
}
