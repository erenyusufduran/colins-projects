import { Body, Controller, Get, Post, Res, UseBefore, Param } from "routing-controllers";
import { Response, json } from "express";
import { TodoService } from "../../services/todo.service";
import { Todo, TodoWithId } from "../../models/todo.model";
import { ObjectId } from "mongodb";

@Controller("/todos")
export class TodoController {
  constructor(private todoService: TodoService) {
    this.todoService = TodoService.createNewTodoService();
  }

  @Get()
  async getAll(@Res() res: Response): Promise<Response<TodoWithId>> {
    try {
      const todos = await this.todoService.find();
      return res.status(200).send({ result: todos });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  @Get("/:id")
  async getWithId(@Param("id") id: ObjectId, @Res() res: Response): Promise<Response<TodoWithId>> {
    try {
      const todo = await this.todoService.findOne({ _id: id });
      if (todo) return res.status(200).send({ result: todo });
      return res.status(404).send({ result: `Couldn't find todo with ${id}` });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  @Post("/")
  @UseBefore(json())
  async create(@Body() body: Todo, @Res() res: Response): Promise<any> {
    try {
      const insertedResult = await this.todoService.create(body);
      return res.status(201).send(insertedResult);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}
