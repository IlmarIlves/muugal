import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column()
    age1: number;

}
