import { Controller, Get, Post, Body, Res, Param } from "routing-controllers";
import { Response } from "express";
import { Todo } from "../../models/Todo";

@Controller("/todos")
export class TodoController {
  @Get()
  async getAll(@Res() res: Response) {
    try {
      const todos = await Todo.find();
      return res.status(200).send({ results: todos });
    } catch (error) {
      return res.status(500).send((error as Error).message);
    }
  }
}
