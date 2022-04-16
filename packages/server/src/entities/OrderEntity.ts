import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm"
import { UserEntity } from "./UserEntity"

@Entity()
export class OrderEntity{
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    userId: string;

    @Column()
    email!: string

    @Column()
    telephone!: string

    @Column()
    colors!: string

    @Column()
    amount!: number

    @Column({nullable: true})
    additionalInfo!: string | null

    @Column({
        type: "longblob"
    })
    data!: Buffer

    @Column()
    mimeType!:string

    @ManyToOne(() => UserEntity, (user) => user.file)
    user!: Promise<UserEntity>;
}
