import { Body, Controller, Get, Post, Res, UseBefore } from "routing-controllers";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user.model";
import { Response, json } from "express";

@Controller("/users")
export class UserController {
  constructor(private userService: UserService) {
    this.userService = UserService.createNewUserService();
  }

  @Post("/register")
  @UseBefore(json())
  async register(@Body() body: User, @Res() res: Response) {
    try {
      const user = await this.userService.create(body);
      const token = await this.userService.generateAuthToken(user);
      res.status(201).send({ user, token });
    } catch (error) {
      return res.status(500).send((error as Error).message);
    }
  }

  @Post("/login")
  @UseBefore(json())
  async login(@Body() body: User, @Res() res: Response) {
    try {
      const user = await this.userService.login(body);
      res.status(200).send({ user });
    } catch (error) {
      return res.status(400).send((error as Error).message);
    }
  }
}
 