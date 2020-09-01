import React from "react";

const ADD_TODO = "ADD_TODO";
const GET_TODOS = "GET_TODOS";
const DELETE_TODO = "DELETE_TODO";

const initialStateTodo = {
  id: "",
  text: "",
};

const initialState = [];

const TodoStateContext = React.createContext([]);

const TodoDispatchContext = React.createContext();

const useTodoDispatchContext = () => {
  const context = React.useContext(TodoDispatchContext);
  if (context === undefined) {
    throw new Error("context todo");
  }
  return context;
};

const useTodoStateContext = () => {
  const context = React.useContext(TodoStateContext);

  if (context === undefined) {
    throw new Error("context todo");
  }
  return context;
};

const todoReducer = (prev, action) => {
  switch (action.type) {
    case ADD_TODO: {
      return [...prev, action.payload];
    }
    case GET_TODOS: {
      return action.payload;
    }
    case DELETE_TODO: {
      const todosFiltered = prev.filter(
        ({ id }) => !action.payload.includes(id)
      );
      return todosFiltered;
    }
    default: {
      throw new Error("type not defined");
    }
  }
};

const TodoProvider = ({ children, initial = initialState }) => {
  const [state, dispatch] = React.useReducer(todoReducer, initial);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
};

const getTodos = async (dispatch) => {
  try {
    const result = await (
      await fetch(process.env.REACT_APP_API_URL + "/api/todo")
    ).json();
    dispatch({
      type: GET_TODOS,
      payload: result.data,
    });
  } catch (e) {
    console.log("e", e.message);
    return [];
  }
};

const createTodo = async (text, dispatch) => {
  try {
    const result = await (
      await fetch(process.env.REACT_APP_API_URL + "/api/todo", {
        method: "POST",
        body: JSON.stringify({ text }),
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();
    dispatch({
      type: ADD_TODO,
      payload: result.data,
    });
  } catch (e) {
    console.log("e", e.message);
  }
};

const deleteTodo = async (todos = [], dispatch) => {
  try {
    dispatch({
      type: DELETE_TODO,
      payload: todos,
    });
    await Promise.all(
      todos.map(async (id) => {
        await fetch(process.env.REACT_APP_API_URL + "/api/todo/" + id, {
          method: "DELETE",
        });
      })
    );
  } catch (e) {
    console.log("e", e.message);
  }
};

export {
  getTodos,
  createTodo,
  deleteTodo,
  ADD_TODO,
  DELETE_TODO,
  TodoProvider,
  useTodoStateContext,
  useTodoDispatchContext,
};
