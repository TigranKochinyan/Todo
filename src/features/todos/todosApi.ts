import { Todo } from "./types";

export function getTodos(): Promise<Todo[]> {
  return fetch("http://localhost:8000/todos").then((res) => res.json());
}

export function addTodo(todo: Todo) {
  return fetch("http://localhost:8000/todos", {
    method: "POST",
    body: JSON.stringify(todo),
  });
}

export function updateTodo(todo: Todo) {
  return fetch(`http://localhost:8000/todos/${todo.id}`, {
    method: "PUT",
    body: JSON.stringify(todo),
  })
}
