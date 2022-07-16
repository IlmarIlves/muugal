import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm"
import { fieldLength } from "../constants";
import { OffersEntity } from "./OffersEntity";
import { UserEntity } from "./UserEntity"

export enum OrderProgressStatus {
    PAYMENT = "PAYMENT",
    PAID = "PAID",
    SENT = "SENT",
    RECEIVED = "RECEIVED",
  }

export enum OrderColors {
    BLACK = "BLACK",
    WHITE = "WHITE",
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

    @Column({type: "int", nullable: true})
    priceInCents!: number | null;

    @Column({type: "int"})
    finishedInDays!: number

    @Column({type: "varchar", nullable: true})
    additionalInfo!: string | null

    @Column({type: "varchar", nullable: true})
    offererUserId!: string | null;

    @Column({ type: "varchar", length: fieldLength.url})
    fileUrl!: string;

    @CreateDateColumn()
    createdDate!: Date;
  
    @UpdateDateColumn()
    updatedDate!: Date;

    @ManyToOne(() => UserEntity, (user) => user.file)
    user!: Promise<UserEntity>;

    @OneToMany(() => OffersEntity, (offer) => offer.order)
    offerer!: Promise<OffersEntity[]>;
}