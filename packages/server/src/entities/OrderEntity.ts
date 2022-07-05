import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity} from "typeorm"
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

    @Column({type: "string"})
    userId!: string;

    @Column({ type: "varchar", length: fieldLength.email })
    email!: string;

    @Column({type: "varchar"})
    telephone!: string

    @Column({type: "varchar"})
    colors!: string

    @Column({type: "int"})
    amount!: number

    @Column({type: "int", nullable: true})
    priceInCents!: number

    @Column({type: "varchar", nullable: true})
    additionalInfo!: string | null

    @Column({
        type: "longblob"
    })
    data!: Buffer

    @Column({type: "varchar"})
    mimeType!: string

    @ManyToOne(() => UserEntity, (user) => user.file)
    user!: Promise<UserEntity>;
}