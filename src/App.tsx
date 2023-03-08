import React, { useState } from "react";
import "./App.css";
import TodoList from "./Components/TodoList";
import Login from "./Components/Login";
import { Routes, Route } from "react-router-dom";
import TodoDetail from "./Components/TodoDetail";
import TodoForm from "./Components/TodoForm";
import EditTodoForm from "./Components/EditTodoForm";
const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  return (
    <Routes>
      <Route path="/" element={<Login onLogin={handleLogin} />} />
      <Route path="/users/:userId/todos" element={<TodoList />} />
      <Route path="/users/:userId/todos/:todoId" element={<TodoDetail />} />
      <Route path="/users/:userId/todos/new" element={<TodoForm />} />
      <Route
        path="/users/:userId/todos/:todoId/edit"
        element={<EditTodoForm />}
      />
    </Routes>
  );
};

export default App;
