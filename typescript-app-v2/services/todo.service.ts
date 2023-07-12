import { Filter } from "mongodb";
import { Todo, TodoWithId, Todos } from "../models/todo.model";
import { Service } from "../interfaces/service.interface";

export class TodoService implements Service<Todo> {
  static createNewTodoService(): TodoService {
    return new TodoService();
  }

  find = async (query?: Filter<TodoWithId>): Promise<TodoWithId[]> => {
    const todos = await Todos.find({ query }).toArray();
    return todos;
  };

  findOne = async (query: Filter<TodoWithId>): Promise<TodoWithId | null> => {
    const todo = await Todos.findOne({ query });
    if (todo) return todo;
    return null;
  };

  findCompletedTodos = async () => {};

  findNoncompletedTodos = async () => {};

  create = async (_todo: Todo): Promise<TodoWithId> => {
    const todo = await Todo.parseAsync(_todo);
    const insertedTodo = await Todos.insertOne(todo);
    return { _id: insertedTodo.insertedId, ...todo };
  };
}
