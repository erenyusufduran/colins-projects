import { Entity, Column, BaseEntity, PrimaryColumn, OneToMany } from "typeorm";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Todo } from "./Todo";
import { Token } from "./Token";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryColumn({ unique: true })
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];

  @OneToMany(() => Token, (token) => token.user)
  tokens: string[];

  async generateAuthToken(): Promise<string> {
    const token = jwt.sign({ username: this.username.toString() }, "secret");
    const savedToken = Token.create({ id: token, user: this });
    await savedToken.save();
    return token;
  }

  static async build({ username, email, password }: User): Promise<User> {
    const dbUser = await User.findOneBy({ username });
    if (dbUser) throw new Error(`There is already an account with this username: ${username}`);
    const user = User.create({ username, email, password });
    user.password = await bcrypt.hash(user.password, 8);
    await user.save();
    return user;
  }

  static async findByCredentials(username: string, password: string): Promise<User> {
    const user = await User.findOneBy({ username });
    if (!user) throw new Error(`There is no account with this username ${username}`);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Password is wrong!");
    return user;
  }
}
