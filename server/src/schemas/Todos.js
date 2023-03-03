import mongoose from "mongoose";
const { Schema, model } = mongoose;

const todosSchema = new Schema({
  title: String,
  complete: Boolean,
  userId: String,
});

const Todos = model("Todos", todosSchema);
export default Todos;
