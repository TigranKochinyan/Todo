import * as yup from "yup";

export const schema = yup.object().shape({
  title: yup.string().min(3).required(),
  description: yup.string().optional(),
});