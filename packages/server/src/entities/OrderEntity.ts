import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity} from "typeorm"
import { fieldLength } from "../constants";
import { UserEntity } from "./UserEntity"

@Entity()
export class OrderEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number

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

    @Column({type: "varchar", nullable: true})
    additionalInfo!: string | null

    @Column({
        type: "longblob"
    })
    data!: Buffer

    @Column({type: "varchar"})
    mimeType!:string

    @ManyToOne(() => UserEntity, (user) => user.file)
    user!: Promise<UserEntity>;
}