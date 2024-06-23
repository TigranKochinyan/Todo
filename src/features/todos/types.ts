export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  deadline?: number;
  description?: string;
  deleted?: boolean;
}