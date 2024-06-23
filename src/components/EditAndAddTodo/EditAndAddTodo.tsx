import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { Box, Button, Modal, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAppDispatch } from "../../app/hooks";
import { Todo } from "../../features/todos/types";
import { schema } from "./config/schema";

import "react-datepicker/dist/react-datepicker.css";
import { AddTodo, UpdateTodo } from "../../features/todos/todos.thunks";
import styles from "./styles.module.scss";
import { randomId } from "../../utils/randomId";

type TodoModalProps = {
  open: boolean;
  handleClose: () => void;
  todo?: Todo;
};

export const TodoModal: FC<TodoModalProps> = ({ open, handleClose, todo }) => {
  const [deadline, setDeadline] = useState<Date | null>(null);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit = (data: Pick<Todo, "title" | "description">) => {
    if (todo) {
      dispatch(
        UpdateTodo({
          title: data.title,
          id: todo.id,
          deadline: deadline?.getTime(),
          description: data.description,
          completed: todo.completed,
          deleted: todo.deleted,
        })
      );
    } else {
      dispatch(
        AddTodo({
          title: data.title,
          id: randomId(),
          deadline: deadline?.getTime(),
          description: data.description,
          deleted: false,
          completed: false,
        })
      );
    }

    handleClose();
  };

  useEffect(() => {
    if (todo) {
      reset({ title: todo.title, description: todo.description });
      todo.deadline && setDeadline(new Date(todo.deadline));
      return;
    }

    reset({
      title: "",
      description: "",
    });
  }, [open, todo]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className={styles.modalContent}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputWrapper}>
            <TextField label="Title" fullWidth {...register("title")} />
            <p className={styles.errorText}>{errors.title?.message}</p>
          </div>

          <div className={styles.inputWrapper}>
            <TextField
              label="Description"
              fullWidth
              {...register("description")}
            />
            <p className={styles.errorText}>{errors.description?.message}</p>
          </div>

          <div className={styles.inputWrapper}>
            <DatePicker
              title="Deadline"
              selected={deadline}
              minDate={new Date()}
              onChange={(date) => setDeadline(date)}
              startDate={new Date()}
            />
          </div>

          <div className={styles.actions}>
            <Button
              className={styles.button}
              variant="contained"
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              className={styles.button}
              disabled={!isValid}
              variant="contained"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};
