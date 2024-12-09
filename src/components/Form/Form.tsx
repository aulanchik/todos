import React, { useState, useEffect } from "react";
import { addTodo, updateTodo } from "@/redux/reducers/todos";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "@/types";

interface FormProps {
  currentTodo?: Todo;
  onSave: () => void;
  onEditCancel: () => void;
}

const Form: React.FC<FormProps> = ({
  currentTodo,
  onEditCancel,
  onSave,
}): JSX.Element => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const notes = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentTodo && notes.find((note) => note.id === currentTodo.id)) {
      setTitle(currentTodo.title);
      setContent(currentTodo.content);
    } else {
      setTitle("");
      setContent("");
      onEditCancel();
    }
  }, [currentTodo, notes, onEditCancel]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentTodo) {
      dispatch(
        updateTodo({
          ...currentTodo,
          title,
          content,
        }),
      );
    } else {
      dispatch(
        addTodo({
          id: uuidv4(),
          title,
          content,
        }),
      );
    }
    setTitle("");
    setContent("");
    onSave();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-lg p-4 mb-4 gap-4"
    >
      <p className="text-3xl font-bold text-center">Note List</p>
      <input
        value={title}
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500 transition duration-200"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500 transition duration-200"
        rows={4}
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600 transition duration-200"
      >
        {currentTodo ? "Update Note" : "Add Note"}
      </button>
    </form>
  );
};

export default Form;
