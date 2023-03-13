const express = require("express");
const { todosRouter, albumsRouter, photosRouter, usersRouter, commentsRouter, postsRouter } = require("./routes");

const app = express();
app.use(express.json());

app.use("/albums", albumsRouter);
app.use("/comments", commentsRouter);
app.use("/photos", photosRouter);
app.use("/posts", postsRouter);
app.use("/todos", todosRouter);
app.use("/users", usersRouter);

app.listen(3000, () => console.log("Server is running at: http://localhost:3000"));
