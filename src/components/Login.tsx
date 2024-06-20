import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import "../styles/Login.css";
const Login: React.FC = () => {
const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState("login");

  useEffect(() => {
    if (location.pathname === "/login") {
      setState("login");
    } else if (location.pathname === "/signup") {
      setState("signup");
    }
  }, [location.pathname]);
  const getNameOfPage = () => {
    switch(state) {
      case "signup": return "Sign Up";
      case "login": return "Login";
    }

  };
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Add your login logic here
  };

  return (
    <div className="login-wrapper">
      <div className="login-form">
        <div className="login-title">
        <FontAwesomeIcon icon={faRightToBracket} size="2xl"/>
            <h2>{getNameOfPage()}</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
