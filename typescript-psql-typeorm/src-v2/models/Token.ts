import { Entity, PrimaryColumn, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity("tokens")
export class Token extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => User, (user) => user.tokens, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_username" })
  user: User;
}
