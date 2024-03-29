import React from "react";
import axios from "axios";
import { Todo } from "../types/type";
import { API_URL } from "../config/constants";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const TodoList = () => {
  const { userId } = useParams<{ userId: string }>();
  const [todos, setTodos] = useState<Todo[]>([]);
  const getTodos = async () => {
    //Fetching todolists from server
    const response = await axios.get(`${API_URL}/users/${userId}/todos`);
    // console.log("response of all todos", response.data);
    setTodos(response.data);
  };
  useEffect(() => {
    getTodos();
  }, [userId]);

  return (
    <div className="todo-app">
      <h1>To-Do List</h1>
      <ul>
        {/* //To display all the todoitems for specific user */}
        {todos.map((todo) => (
          <li key={todo.id} className="todo-row">
            <Link to={`/users/${userId}/todos/${todo.id}`}>{todo.title}</Link>
          </li>
        ))}
      </ul>
      {/* This will redirect you to todoform */}
      <Link to={`/users/${userId}/todos/new`}>
        <button className="todo-button">Create Todo</button>
      </Link>
    </div>
  );
};
export default TodoList;
