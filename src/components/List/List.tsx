import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo } from "@/redux/reducers/todos";
import { RootState } from "@/redux/store";
import { Todo } from "@/types";

interface ListProps {
  onEdit: (todo: Todo) => void;
  onEditCancel: () => void;
}

const List: React.FC<ListProps> = ({ onEdit, onEditCancel }): JSX.Element => {
  const todosList = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();

  const handleDelete = (noteId: string) => {
    dispatch(deleteTodo(noteId));
    onEditCancel();
  };

  return (
    <div className="space-y-4">
      {todosList.map((todo) => (
        <div
          key={todo.id}
          className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-4"
        >
          <p className="text-lg font-bold">{todo.title}</p>
          <p className="text-gray-700">{todo.content}</p>
          <div className="mt-2 space-x-2">
            <button
              onClick={() => onEdit(todo)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(todo.id)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
