import { Controller, Get, Post, Body, Res, Param, UseBefore, Delete } from "routing-controllers";
import { Response, json } from "express";
import { User } from "../../models";

@Controller("/users")
export class UserController {
  @Post("/register")
  @UseBefore(json())
  async register(@Body() body: User, @Res() res: Response): Promise<Response<User>> {
    try {
      const user = await User.build(body);
      const token = await user.generateAuthToken();
      return res.status(201).send({ user, token });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  @Post("/login")
  @UseBefore(json())
  async login(@Body() body: User, @Res() res: Response): Promise<Response<User>> {
    try {
      const user = await User.findByCredentials(body.username, body.password);
      const token = await user.generateAuthToken();
      return res.status(200).send({ user, token });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
}
