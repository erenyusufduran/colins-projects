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

  static async build(todo: Todo, user: User): Promise<Todo> {
    const recordedTodo = Todo.create({ name: todo.name, completed: todo.completed, user });
    await recordedTodo.save();
    return recordedTodo;
  }
}
