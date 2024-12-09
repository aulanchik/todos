import { Todo } from "@/types";

interface TodosState {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: [],
};

export default initialState;
