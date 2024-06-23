import React, { useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { GetTodos } from "../../features/todos/todos.thunks";
import {
  selectEditingTodoID,
  selectTodos,
  setEditingTodoId,
} from "../../features/todos/todosSlice";
import { TodoCard } from "../../components/TodoCard/TodoCard";
import { TodoModal } from "../../components/EditAndAddTodo/EditAndAddTodo";

import styles from "./styles.module.scss";

function Home() {
  const dispatch = useAppDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const editingTodoID = useAppSelector(selectEditingTodoID);
  const todos = useAppSelector(selectTodos);

  const todosStatus = useAppSelector((state) => state.todos.status);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    dispatch(setEditingTodoId(""));
  };

  useEffect(() => {
    dispatch(GetTodos());
  }, []);

  if (todosStatus === "loading") {
    return <div className={styles.loading}>
      <CircularProgress  />
    </div>;
  }

  return (
    <div className={styles.root}>
      <Button onClick={handleOpenModal} variant="contained" color="primary">
        Add TODO
      </Button>

      {todos.length > 0 && (
        <div className={styles.cardWrapper}>
          {todos.map((todo) => {
            return (
              <TodoCard onEdit={handleOpenModal} key={todo.id} todo={todo} />
            );
          })}
        </div>
      )}

      <TodoModal
        todo={
          editingTodoID
            ? todos.find((todo) => todo.id === editingTodoID)
            : undefined
        }
        open={modalIsOpen}
        handleClose={handleCloseModal}
      />
    </div>
  );
}

export default Home;
