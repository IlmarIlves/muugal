import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from "typeorm";
 
  
  @Entity({ name: "user" })
  export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    readonly id!: string;
  
    @Column({ type: "varchar"})
    userName!: string;
  
    @Index()
    @Column({ type: "varchar" })
    userSurname!: string;

    @CreateDateColumn()
    createdDate!: Date;
  
    @UpdateDateColumn()
    updatedDate!: Date;
  
    @DeleteDateColumn()
    deletedDate!: Date;

  }
  