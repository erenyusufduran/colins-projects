import { Document, Model, Schema, ObjectId, model } from "mongoose";

interface ITodo {
  title: string;
  description: string;
  owner: ObjectId;
}

interface TodoDoc extends Document {
  title: string;
  description: string;
  owner: ObjectId;
}

interface TodoModelInterface extends Model<TodoDoc> {
  build(attr: ITodo): TodoDoc;
}

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

todoSchema.statics.build = (attr: ITodo) => {
  return new Todo(attr);
};

const Todo = model<TodoDoc, TodoModelInterface>("Todo", todoSchema);

export { Todo };
