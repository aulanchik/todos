import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import initialState from "./initState";
import { Todo } from "@/types";

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.todos.findIndex(
        (todo: Todo) => todo.id === action.payload.id,
      );
      if (index !== -1) state.todos[index] = action.payload;
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(
        (todo: Todo) => todo.id !== action.payload,
      );
    },
  },
});

export const { addTodo, updateTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
