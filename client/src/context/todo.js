import React from "react";

const ADD_TODO = "ADD_TODO";
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
      return prev;
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

export {
  ADD_TODO,
  DELETE_TODO,
  TodoProvider,
  useTodoStateContext,
  useTodoDispatchContext,
};
