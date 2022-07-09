import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity, CreateDateColumn, UpdateDateColumn} from "typeorm"
import { fieldLength } from "../constants";
import { UserEntity } from "./UserEntity"

export enum OrderProgressStatus {
    PAYMENT = "PAYMENT",
    PAID = "PAID",
    SENT = "SENT",
    RECEIVED = "RECEIVED",
  }


@Entity({ name: 'order' })
export class OrderEntity extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    readonly id!: string;

    @Column({type: "varchar"})
    userId!: string;

    @Column({ type: "varchar", length: fieldLength.email })
    email!: string;

    @Column({type: "varchar"})
    telephone!: string

    @Column({type: "varchar"})
    colors!: string

    @Column({type: "int"})
    amount!: number

    @Column({type: "int"})
    priceInCents!: number

    @Column({type: "int"})
    finishedInDays!: number

    @Column({type: "varchar", nullable: true})
    additionalInfo!: string | null

    @Column({type: "varchar"})
    lastOffererUserId!: string;

    @Column({
        type: "longblob"
    })
    data!: Buffer

    @Column({type: "varchar"})
    mimeType!: string

    @CreateDateColumn()
    createdDate!: Date;
  
    @UpdateDateColumn()
    updatedDate!: Date;

    @ManyToOne(() => UserEntity, (user) => user.file)
    user!: Promise<UserEntity>;
}