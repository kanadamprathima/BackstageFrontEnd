import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../config/constants";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Todo } from "../types/type";
//For adding new todo
const TodoForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { userId } = useParams();
  const [todo, setTodo] = useState<Todo | null>(null);
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //Giving alert message
    if (!title || !description) {
      alert("Provide title and description");
      return;
    }
    //for adding newtodo
    const newtodo = await axios.post(`${API_URL}/users/${userId}/todos`, {
      title,
      description,
    });
    setTodo(newtodo.data);
    // console.log("newtodo", newtodo);
    setTitle("");
    setDescription("");
    navigate(`/users/${userId}/todos`);
  };
  return (
    <div className="todo-app ">
      <div className="card-body">
        <h1>Create New Todo</h1>
        <form onSubmit={handleSubmit} className="todo-form ">
          <div className="mb-3">
            <label>
              Title:
              <input
                type="text"
                className="todo-input"
                placeholder="add new task"
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
                placeholder="add description"
                className="todo-input"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              ></textarea>
            </label>
          </div>
          <br />
          <button type="submit" className="todo-button">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};
export default TodoForm;
