import React from "react";
import Todo from "./Todo";

export default function TodoList({ todos, handleOnChange }) {
  return todos.map((todo) => {
    return (
      <div key={todo._id}>
        <Todo todo={todo} handleOnChange={handleOnChange} />
      </div>
    );
  });
}
