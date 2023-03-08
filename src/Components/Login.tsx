import React, { useEffect, useState } from "react";
import { LoginCredentials, User } from "../types/type";
import { API_URL } from "../config/constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Props {
  onLogin: () => void;
}
const LoginPage: React.FC<Props> = ({ onLogin }) => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (token && user) {
      navigate(`/users/${user.id}/todos`);
    }
  }, [navigate, token, user]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    setCredentials((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: send login request to server with credentials
    try {
      const res = await axios.post(`${API_URL}/login`, credentials);
      console.log("loggin res fron frontend", res.data);
      setUser(res.data.reqUser);
      setToken(res.data.token);
    } catch (error) {
      console.log(error);
    }
    console.log("Submitting login form with credentials:", credentials);
  };
  const handleLoginClick = () => {
    onLogin();
  };

  return (
    <div className="todo-app">
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit} className="todo-form">
        <label>
          <input
            className="todo-input"
            placeholder="Enter Email"
            type="text"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          <input
            className="todo-input"
            placeholder="Enter password"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button onClick={handleLoginClick} className="todo-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
