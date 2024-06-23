import { createAsyncThunk } from "@reduxjs/toolkit";
import { addTodo, getTodos, updateTodo } from "./todosApi";
import { Todo } from "./types";

export const GetTodos = createAsyncThunk("todos/getTodos", async () => {
  return await getTodos();
});

export const AddTodo = createAsyncThunk("todos/addTodo", async (todo: Todo) => {
  const response = await addTodo(todo);
  return { status: response.status, data: todo };
});

export const UpdateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (todo: Todo) => {
    const response = await updateTodo(todo);
    return { status: response.status, data: todo };
  }
);
