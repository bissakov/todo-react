import React, { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() === "") return;

    const newTodoItem: Todo = {
      id: todos.length + 1,
      text: newTodo,
      completed: false,
    };

    setTodos([...todos, newTodoItem]);
    setNewTodo("");
  };

  const handleToggleComplete = (todoId: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    );

    setTodos(updatedTodos);
  };

  const handleRemoveTodo = (todoId: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);

    setTodos(updatedTodos);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">TO-DO App</h1>

      <div className="flex mb-4">
        <input
          type="text"
          className="border border-gray-400 rounded-md px-2 py-1 mr-2"
          placeholder="New Todo"
          value={newTodo}
          onChange={handleInputChange}
        />
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded-md"
          onClick={handleAddTodo}
        >
          Add Todo
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex items-center ${
              todo.completed ? "line-through text-gray-400" : ""
            }`}
          >
            <input
              type="checkbox"
              className="mr-2"
              checked={todo.completed}
              onChange={() => handleToggleComplete(todo.id)}
            />
            <span>{todo.text}</span>
            <button
              className="text-red-500 ml-auto"
              onClick={() => handleRemoveTodo(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
