import React, { useState } from "react";
import { LoginCredentials } from "../types/type";
import { API_URL } from "../config/constants";
import axios from "axios";

const LoginPage = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });

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
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
    console.log("Submitting login form with credentials:", credentials);
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
