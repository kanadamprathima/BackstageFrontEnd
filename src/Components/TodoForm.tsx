import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../config/constants";
import { useNavigate } from "react-router-dom";

interface TodoFormProps {
  userId: number;
}

const TodoForm: React.FC<TodoFormProps> = ({ userId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newtodo = await axios.post(`${API_URL}/users/1/todos`, {
      title,
      description,
    });
    console.log("newtodo", newtodo);
    navigate(`/users/${userId}/todos`);
  };
  return (
    <div>
      <h1>Create New Todo</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            placeholder="add new task"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <label>Description:</label>
        <textarea
          placeholder="add description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        ></textarea>

        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};
export default TodoForm;
