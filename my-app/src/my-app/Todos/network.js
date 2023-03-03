export const getTodos = async function ({ jwt }) {
  try {
    const res = await fetch("http://localhost:1337/api/todos", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    const { todos, message } = data;
    if (!todos) {
      alert(message);
      return;
    }
    return todos;
  } catch (ex) {
    console.log(ex.message);
  }
};

export const onAddTodo = async function ({ title, jwt }) {
  try {
    const res = await fetch("http://localhost:1337/api/add-todo", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        complete: false,
      }),
    });
    const data = await res.json();
    const { todo, message } = data;
    if (!todo) {
      alert(message);
      return;
    }
    return todo;
  } catch (ex) {
    console.log(ex.message);
  }
};

export const onComplete = async function ({ todo, jwt }) {
  try {
    const res = await fetch("http://localhost:1337/api/complete-todo", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todo,
        complete: !todo.complete,
      }),
    });
    const data = await res.json();
    const { updatedTodo, message } = data;
    if (!updatedTodo) {
      alert(message);
      return;
    }
    return updatedTodo;
  } catch (ex) {
    console.log(ex.message);
  }
};
