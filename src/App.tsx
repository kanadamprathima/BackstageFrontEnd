import React, { useState } from "react";
import "./App.css";

import TodoList from "./Components/TodoList";
import axios from "axios";
import Login from "./Components/Login";
import { API_URL } from "./config/constants";
import { Routes, Route } from "react-router-dom";
import TodoDetail from "./Components/TodoDetail";
import TodoForm from "./Components/TodoForm";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  // const getTodos = async () => {
  //   const response = await axios.get(`${API_URL}/`);
  // };
  return (
    <Routes>
      <Route path="/" element={<Login onLogin={handleLogin} />} />
      <Route path="/users/:userId/todos" element={<TodoList />} />
      <Route path="/users/:userId/todos/:todoId" element={<TodoDetail />} />
      <Route
        path="/users/:userId/todos/:todoId/edit"
        element={<TodoForm userId={1} />}
      />
    </Routes>
  );
};

export default App;
