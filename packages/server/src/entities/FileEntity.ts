import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm"
import { UserEntity } from "./UserEntity"

@Entity()
export class FileEntity{

    @PrimaryGeneratedColumn()
    id!: number 

    @Column()
    name!: string

    @Column({
        type: "longblob"
    })
    data!: Buffer

    @Column()
    mimeType!:string

    @ManyToOne(() => UserEntity, (user) => user.file)
    user!: Promise<UserEntity>;
}
