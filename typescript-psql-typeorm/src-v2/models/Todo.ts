import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity("todos")
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ default: false })
  completed: boolean;

  @ManyToOne(() => User, (user) => user.todos, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_username" })
  user: User;
}
