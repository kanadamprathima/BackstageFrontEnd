import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config/constants";
import { useNavigate, useParams } from "react-router-dom";
import { Todo } from "../types/type";

const EditTodoForm = () => {
  const { userId, todoId } = useParams();
  const [todo, setTodo] = useState<Todo | null>(null);
  const [title, setTitle] = useState(todo?.description || "");
  const [description, setDescription] = useState(todo?.description || "");
  const navigate = useNavigate();
  const handleEdit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedTodo = {
      title,
      description,
    };
    //fetch data from API to update todo
    const response = await axios.put(
      `${API_URL}/users/${userId}/todos/${todoId}`,
      updatedTodo
    );
    console.log("update todo", response);
    navigate(`/users/${userId}/todos/${todoId}`);
  };
  useEffect(() => {
    const fetchTodo = async () => {
      try {
        //fetch the required todoitemId
        const response = await axios.get<Todo>(
          `${API_URL}/users/${userId}/todos/${todoId}`
        );
        console.log("responsefrom fetchtodo", response);
        setTodo(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTodo();
  }, [userId, todoId]);

  return (
    <div className="todo-app">
      <div className="card-body">
        <h1>Edit Todo</h1>
        <form onSubmit={handleEdit}>
          <div className="mb-3">
            <label>
              Title:
              <input
                type="text"
                className="todo-input"
                placeholder="Edit task"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </label>
          </div>
          <br />
          <div className="mb-3">
            <label>
              Description:
              <textarea
                placeholder="Edit description"
                className="todo-input"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              ></textarea>
            </label>
          </div>
          <br />
          <button type="submit" className="todo-button">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTodoForm;
