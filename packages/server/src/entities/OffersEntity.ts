import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity, CreateDateColumn, UpdateDateColumn} from "typeorm"
import { OrderEntity } from "./OrderEntity";
import { UserEntity } from "./UserEntity"

@Entity({ name: 'offer' })
export class OffersEntity extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    readonly id!: string;

    @Column({type: "varchar"})
    userId!: string;

    @Column({type: "int", nullable: true})
    priceInCents!: number | null;

    @Column({type: "int"})
    finishedInDays!: number

    @CreateDateColumn()
    createdDate!: Date;
  
    @UpdateDateColumn()
    updatedDate!: Date;

    @ManyToOne(() => UserEntity, (user) => user.file)
    user!: Promise<UserEntity>;

    @ManyToOne(() => OrderEntity, (order) => order.offerer)
    order!: Promise<OrderEntity>;
}