import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { fieldLength } from "../constants";
import { UserEntity } from "./UserEntity";

export enum PaymentStatus {
  NOT_PAID = "NOT_PAID",
  PAID = "PAID",
  STARTED = "STARTED",
  APPROVAL_PENDING = "APPROVAL_PENDING",
  TRIAL_ACTIVATED = "TRIAL_ACTIVATED",
  RENEW_FAILED = "RENEW_FAILED",
  RENEW_SUCCEEDED = "RENEW_SUCCEEDED",
}

@Entity({ name: "payment" })
export class PaymentEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  readonly id!: string;

  @Column({ type: "varchar", length: fieldLength.uuid })
  userId!: string;

  @Column({ type: "varchar", nullable: true })
  stripeSessionId!: string | null;

  @Column({ type: "enum", enum: PaymentStatus, default: PaymentStatus.NOT_PAID })
  status!: PaymentStatus;

  @Column({ type: "float" })
  amount!: number;

  @Column({ type: "varchar" })
  currencyCode!: string;

  @Column({ type: "varchar", length: fieldLength.email, nullable: true })
  emailUsedForPayment!: string | null;

  @CreateDateColumn()
  createdDate!: Date;

  @CreateDateColumn()
  updatedDate!: Date;

  @ManyToOne(() => UserEntity, (user) => user.payments)
  user!: Promise<UserEntity>;
}
