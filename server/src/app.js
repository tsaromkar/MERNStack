import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "./schemas/User.js";
import Todos from "./schemas/Todos.js";
import { JWT_SECRET_KEY } from "./constants.js";

const app = express();
const port = 1337;

app.use(cors());
app.use(json());

mongoose.connect(
  "mongodb+srv://omkar357:f5tadKXqkdiSFE9K@mycluster.yvsescy.mongodb.net/my-app"
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/message", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post("/api/complete-todo", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, JWT_SECRET_KEY);
  const { userId, email } = decoded;
  try {
    const user = await User.findOne({
      email,
    });
    if (!user) {
      res.json({
        status: "ok",
        user: false,
        message: `User not found!`,
      });
      return;
    }

    const todo = req.body.todo;
    const complete = req.body.complete;
    const { _id } = todo;
    const searchedTodo = await Todos.findById({
      _id,
    });

    if (searchedTodo) {
      searchedTodo.complete = complete;
      const updatedTodo = await searchedTodo.save();
      if (updatedTodo) {
        res.json({
          status: "ok",
          updatedTodo,
          message: "Todo updated successfully!",
        });
      }
    }
  } catch (ex) {
    res.json({
      status: "ok",
      updatedTodo: false,
      message: "Could not update todo!",
    });
  }
});

app.post("/api/add-todo", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, JWT_SECRET_KEY);
  const { userId, email } = decoded;
  try {
    const user = await User.findOne({
      email,
    });
    if (!user) {
      res.json({
        status: "ok",
        user: false,
        message: `User not found!`,
      });
      return;
    }

    const title = req.body.title;
    const complete = req.body.complete;
    const todo = await Todos.create({
      title,
      complete,
      userId,
    });

    if (todo) {
      res.json({
        status: "ok",
        todo,
        message: "Todo added successfully!",
      });
    }
  } catch (ex) {
    res.json({
      status: "ok",
      todo: false,
      message: "Could not add todo!",
    });
  }
});

app.get("/api/todos", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, JWT_SECRET_KEY);
  const { userId, email } = decoded;
  try {
    const user = await User.findOne({
      email,
    });
    if (!user) {
      res.json({
        status: "ok",
        user: false,
        message: `User not found!`,
      });
      return;
    }

    const todos = await Todos.find({ userId });

    if (todos) {
      res.json({
        status: "ok",
        todos,
        message: `${todos.length} todos found!`,
      });
    }
  } catch (ex) {
    res.json({
      status: "ok",
      todos: false,
      message: "No todos found!",
    });
  }
});

app.post("/api/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({
      email,
      password,
    });
    if (user) {
      const token = jwt.sign(
        { userId: user._id, name: user.name, email: user.email },
        JWT_SECRET_KEY
      );
      res.json({
        status: "ok",
        user: true,
        message: "User found!",
        jwt: token,
      });
    } else {
      res.json({
        status: "ok",
        user: false,
        message: "User not found!",
      });
    }
  } catch (ex) {
    res.json({
      status: "ok",
      user: false,
      message: "User not found!",
    });
  }
});

app.post("/api/signup", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.create({
      name,
      email,
      password,
    });
    if (user) {
      res.json({
        status: "ok",
        user: true,
        message: "User created successfully!",
      });
    }
  } catch (ex) {
    res.json({
      status: "ok",
      user: false,
      message: "User already exists!",
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
