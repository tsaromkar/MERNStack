const todosReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return onAddTodo(state, action);
    case "COMPLETE":
      return onComplete(state, action);
    default:
      return state;
  }
};

export default todosReducer;

export const onAddTodo = async function (state, action) {
  const todos = state;
  const newTodo = {
    id: String(todos.length + 1),
    title: action.title,
    complete: false,
  };
  return [...state, newTodo];
};

export const onComplete = async function (state, action) {
  return state.map((todo) => {
    if (todo.id === action.id) {
      return { ...todo, complete: !todo.complete };
    } else {
      return todo;
    }
  });
};
