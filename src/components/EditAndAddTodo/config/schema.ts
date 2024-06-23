import * as yup from "yup";

import {Todo} from '../../../features/todos/types'

// yup.ObjectSchema<Omit<Todo, 'id' | 'deadline'>>

export const schema = yup.object().shape({
  title: yup.string().min(3).required(),
  description: yup.string().optional(),
});