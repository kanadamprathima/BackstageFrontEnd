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
    const response = await axios.get(`${API_URL}/users/${userId}/todos`);
    console.log("response of all todos", response.data);
    setTodos(response.data);
  };
  useEffect(() => {
    getTodos();
  }, [userId]);

  return (
    <div>
      <h1>To-Do List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <Link to={`/users/${userId}/todos/${todo.id}`}>{todo.title}</Link>
          </li>
        ))}
      </ul>
      <Link to={`/users/${userId}/todos/:todoId/edit`}>Create New Todo</Link>
    </div>
  );
};
export default TodoList;
