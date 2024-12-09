import React, { useState } from "react";
import { Form, List } from "@/components";
import { Todo } from "@/types";

const App: React.FC = (): JSX.Element => {
  const [currentTodo, setCurrentTodo] = useState<Todo | undefined>(undefined);

  const handleEdit = (todo: Todo) => {
    setCurrentTodo(todo);
  };

  const handleSave = () => {
    setCurrentTodo(undefined);
  };

  const handleEditCancel = () => {
    setCurrentTodo(undefined);
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white shadow-lg rounded-lg">
        <Form
          onSave={handleSave}
          currentTodo={currentTodo}
          onEditCancel={handleEditCancel}
        />
        <List onEdit={handleEdit} onEditCancel={handleEditCancel} />
      </div>
    </main>
  );
};

export default App;
