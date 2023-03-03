import React, { useCallback, useEffect, useMemo, useState } from "react";
import { LOGIN_ROUTE, MY_APP_JWT } from "../Constants";
import { AddTodo, TodoList } from "./components";
import { getTodos, onAddTodo, onComplete } from "./network";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const jwt = localStorage.getItem(MY_APP_JWT);

  useEffect(() => {
    (async () => {
      if (!jwt) {
        return;
      }
      const userTodos = await getTodos({ jwt });
      setTodos(userTodos);
    })();
  }, [jwt, setTodos]);

  const todosExist = useMemo(() => todos && todos.length > 0, [todos]);

  const handleOnAddTodo = useCallback(
    async (title) => {
      const todo = await onAddTodo({ title, jwt });
      setTodos((prevTodos) => {
        return [...prevTodos, todo];
      });
    },
    [jwt]
  );

  const handleOnChange = useCallback(
    async (todo) => {
      const updatedTodo = await onComplete({ todo, jwt });
      setTodos((prevTodos) => {
        return prevTodos.map((item) => {
          if (item._id === todo._id) {
            return updatedTodo;
          } else {
            return item;
          }
        });
      });
    },
    [jwt]
  );

  const handleOnLogout = useCallback(() => {
    localStorage.removeItem(MY_APP_JWT);
    window.location.href = LOGIN_ROUTE;
  }, []);

  if (!jwt) {
    handleOnLogout();
    return null;
  }

  return (
    <>
      <button onClick={handleOnLogout}>Logout</button>
      <AddTodo onAddTodo={handleOnAddTodo} />{" "}
      {todosExist && <TodoList todos={todos} handleOnChange={handleOnChange} />}
    </>
  );
}
