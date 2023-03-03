import React from "react";

export default function Todo({ todo, handleOnChange }) {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={todo.complete}
          onChange={() => handleOnChange(todo)}
        />
        {todo.title}
      </label>
    </div>
  );
}
