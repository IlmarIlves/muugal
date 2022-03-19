import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm"
import { UserEntity } from "./UserEntity"

@Entity()
export class PaymentEntity{

    @PrimaryGeneratedColumn()
    id: number 

    @Column()
    price: string

    @ManyToOne(() => UserEntity, (user) => user.payment)
    user!: Promise<UserEntity>;
}
