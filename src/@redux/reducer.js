import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const addTodoReducer = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...state, user: action.payload}
    },
    addTodos: (state, action) => {
      state.push(action.payload);
      return state;
    },
    removeTodos: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    //update todos
    updateTodos: (state, action) => {
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            item: action.payload.item,
          };
        }
        return todo;
      });
    },
    //completed
    completeTodos: (state, action) => {
      return state.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            completed: true,
          };
        }
        return todo;
      });
    },
  },
});

export const { addTodos, removeTodos, updateTodos, completeTodos, setUser } =
  addTodoReducer.actions;
export const reducer = addTodoReducer.reducer;
