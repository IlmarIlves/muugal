import {Entity, Column, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class FileEntity{

    @PrimaryGeneratedColumn()
    id: number 

    @Column()
    name: string

    @Column({
        type: "longblob"
    })
    data: string

    @Column()
    mimeType:string
}
