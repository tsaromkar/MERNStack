import React, { useCallback, useState } from "react";

export default function AddTodo({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState("");

  const handleSetTodoTitle = useCallback(
    (e) => {
      setTodoTitle(e.target.value);
    },
    [setTodoTitle]
  );

  const handleOnAddTodo = useCallback(() => {
    if (todoTitle === "") {
      alert("Enter Todo");
      return;
    }
    onAddTodo(todoTitle);
    setTodoTitle("");
  }, [onAddTodo, todoTitle, setTodoTitle]);

  const handleOnKeyDown = useCallback(
    (e) => {
      e.key === "Enter" && handleOnAddTodo();
    },
    [handleOnAddTodo]
  );

  return (
    <div>
      <label>
        <input
          type="text"
          onChange={handleSetTodoTitle}
          onKeyDown={handleOnKeyDown}
        />
        <button onClick={handleOnAddTodo}>Add Todo</button>
      </label>
    </div>
  );
}
