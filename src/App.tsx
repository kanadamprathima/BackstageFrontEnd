import React from "react";
import "./App.css";
import TodoList from "./Components/TodoList";
import axios from "axios";
import LoginPage from "./Components/Login";
import { API_URL } from "./config/constants";
function App() {
  // const getTodos = async () => {
  //   const response = await axios.get(`${API_URL}/`);
  // };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo App</h1>
      </header>
      <LoginPage />
      <TodoList />
    </div>
  );
}

export default App;
