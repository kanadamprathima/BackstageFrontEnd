import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Todo } from "../types/type";
import { API_URL } from "../config/constants";

const TodoDetail: React.FC = () => {
  const [todo, setTodo] = useState<Todo | null>(null);
  const { userId, todoId } = useParams<{ userId: string; todoId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodo = async () => {
      const response = await axios.get<Todo>(
        `${API_URL}/users/${userId}/todos/${todoId}`
      );
      setTodo(response.data);
    };

    fetchTodo();
  }, [userId, todoId]);

  const handleEdit = () => {
    // navigate(`/users/${userId}/todos/${todoId}/edit`);
  };

  const handleDelete = async () => {
    await axios.delete(`${API_URL}/users/${userId}/todos/${todoId}`);
    navigate(`/users/${userId}/todos`);
  };

  if (!todo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="todo-row">
        <h2>{todo.title}</h2>
        <p>{todo.description}</p>
        <button onClick={handleEdit} className="todo-button">
          Edit
        </button>
        <button onClick={handleDelete} className="todo-button">
          Delete
        </button>
        <Link to={`/users/${userId}/todos`}>
          <button className="todo-button">BACK </button>
        </Link>
      </div>
    </div>
  );
};

export default TodoDetail;
