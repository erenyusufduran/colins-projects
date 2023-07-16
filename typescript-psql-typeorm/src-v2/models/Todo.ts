import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("todos")
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ default: false })
  completed: boolean;
}
