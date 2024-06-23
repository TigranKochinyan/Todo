import styles from "./styles.module.scss";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectDeletedTodos} from "../../features/todos/todosSlice";
import {TodoCard} from "../../components/TodoCard/TodoCard";
import React, {useEffect} from "react";
import {GetTodos} from "../../features/todos/todos.thunks";

const Trash = () => {
  const dispatch = useAppDispatch();

  const deletedTodos = useAppSelector(selectDeletedTodos);

  useEffect(() => {
    dispatch(GetTodos());
  }, []);

  return (
    <div className={styles.root}>
      {deletedTodos.length > 0 && (
        <div className={styles.cardWrapper}>
          {deletedTodos.map((todo) => {
            return (
              <TodoCard
                key={todo.id}
                todo={todo}
              />
            );
          })}
        </div>
      )}

    </div>
  );
};

export default Trash
