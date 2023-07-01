import mongoose from "mongoose";

interface ITodo {
  title: string;
  description: string;
}

interface TodoDoc extends mongoose.Document {
  title: string;
  description: string;
}

interface TodoModelInterface extends mongoose.Model<TodoDoc> {
  build(attr: ITodo): TodoDoc;
}

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

todoSchema.statics.build = (attr: ITodo) => {
  return new Todo(attr);
};

const Todo = mongoose.model<TodoDoc, TodoModelInterface>("Todo", todoSchema);

export { Todo };
