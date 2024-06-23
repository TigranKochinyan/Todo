import { ChangeEvent, FC, useMemo } from "react";

import styles from "./styles.module.scss";
import {
  Button,
  CardActions,
  CardContent,
  Switch,
  Typography,
} from "@mui/material";
import { Todo } from "../../features/todos/types";

import { setEditingTodoId } from "../../features/todos/todosSlice";
import { useAppDispatch } from "../../app/hooks";
import { UpdateTodo } from "../../features/todos/todos.thunks";

type TodoCardProps = {
  todo: Todo;
  onEdit?: () => void;
};

export const TodoCard: FC<TodoCardProps> = ({ todo, onEdit }) => {
  const dispatch = useAppDispatch();

  const isOverdueTask = useMemo(() => {
    return todo.deadline ? new Date() > new Date(todo.deadline) : false;
  }, [todo.deadline]);

  const handleEdit = () => {
    dispatch(setEditingTodoId(todo.id));
    onEdit && onEdit();
  };

  const handleChangeDeleted = () => {
    dispatch(
      UpdateTodo({
        ...todo,
        deleted: !todo.deleted,
      })
    );
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      UpdateTodo({
        ...todo,
        completed: !todo.completed,
      })
    );
  };

  const deadlineFormatted = useMemo(() => {
    return todo.deadline ? new Date(todo.deadline).toDateString() : "";
  }, [todo.deadline]);

  return (
    <div className={styles.root}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {todo.title}
          <Switch
            disabled={isOverdueTask}
            onChange={handleChange}
            checked={todo.completed}
          />
        </Typography>

        <Typography variant="h6">deadline</Typography>

        <Typography variant="h5" component="div">
          {deadlineFormatted}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {todo.description}
        </Typography>
      </CardContent>
      <CardActions className={styles.actions}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleEdit}
          size="small"
          disabled={!onEdit}
        >
          Edit
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={handleChangeDeleted}
          size="small"
        >
          {todo.deleted ? "Restore" : "Delete"}
        </Button>
      </CardActions>
    </div>
  );
};
