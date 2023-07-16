import { Controller, Get, Post, Body, Res, Req, Param, UseBefore, Delete } from "routing-controllers";
import { Response, json } from "express";
import { Todo } from "../../models";
import { AuthMiddleware, AuthRequest } from "../middlewares/AuthMiddleware";

@Controller("/todos")
export class TodoController {
  @Get()
  async getAll(@Res() res: Response): Promise<Response<Todo[]>> {
    try {
      const todos = await Todo.find();
      return res.status(200).send({ result: todos });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  @Get("/:id")
  async getWithId(@Param("id") id: string, @Res() res: Response): Promise<Response<Todo>> {
    try {
      const todo = await Todo.findOneBy({ id });
      if (todo) return res.status(200).send({ result: todo });
      return res.status(404).send({ result: `Couldn't find todo with ${id}` });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  @Post("/")
  @UseBefore(json())
  @UseBefore(AuthMiddleware) // neden tüm requestlerimi engelliyor?
  async create(@Body() body: Todo, @Req() req: AuthRequest, @Res() res: Response): Promise<any> {
    try {
      const todo = await Todo.build(body, req.user);
      return res.status(201).send(todo);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  @Delete("/:id")
  @UseBefore(AuthMiddleware)
  async delete(@Param("id") id: string, @Res() res: Response): Promise<any> {
    try {
      const todo = await Todo.findOneBy({ id });
      if (!todo) throw new Error(`There is no todo with this id ${id}`);
      todo.remove();
      return res.send({ result: "Todo has been removed" });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
}
