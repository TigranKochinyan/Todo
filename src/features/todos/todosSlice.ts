import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Todo } from "./types";
import { AddTodo, GetTodos, UpdateTodo } from "./todos.thunks";

export interface TodosState {
  todos: Todo[];
  status: "idle" | "loading" | "failed";
  editingTodoId: string;
}

const initialState: TodosState = {
  todos: [],
  status: "idle",
  editingTodoId: "",
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setEditingTodoId: (state, action: PayloadAction<string>) => {
      state.editingTodoId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetTodos.fulfilled, (state, action) => {
        state.status = "idle";
        state.todos = action.payload;
      })
      .addCase(GetTodos.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(AddTodo.pending, (state) => {
        state.status = "failed";
      })
      .addCase(AddTodo.fulfilled, (state, action) => {
        state.status = "idle";
        state.todos = [...state.todos, action.payload.data];
      })
      .addCase(AddTodo.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(UpdateTodo.pending, (state) => {
        state.status = "failed";
      })
      .addCase(UpdateTodo.fulfilled, (state, action) => {
        state.status = "idle";
        const updatedTodo = action.payload.data;

        state.todos = state.todos.map((todo) => {
          if (todo.id === action.payload.data.id) {
            return updatedTodo;
          }
          return todo;
        });
      })
      .addCase(UpdateTodo.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setEditingTodoId } = todosSlice.actions;

export const selectTodos = (state: RootState) =>
  state.todos.todos.filter((todo) => !todo.deleted);

export const selectDeletedTodos = (state: RootState) =>
  state.todos.todos.filter((todo) => todo.deleted);

export const selectEditingTodoID = (state: RootState) =>
  state.todos.editingTodoId;

export default todosSlice.reducer;
