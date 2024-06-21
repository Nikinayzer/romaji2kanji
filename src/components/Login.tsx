import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import "../styles/Login.css";
import ApiService from "../api/apiService"; // Adjust the path based on your file structure

const Login: React.FC = () => {
  const location = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies(['jsession']);
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
      default: return "";
    }
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await ApiService.login(username, password).then(
        (response) => {
          console.log(Array.from(response.headers.entries()))     
          console.log("Login successful:", username);
          console.log("Login response:", response);
          console.log(response.credentials)
          // Handle successful login response
        }
      ).catch(
        (error) => {
          console.error("Login failed:", error);
          console.log(Array.from(error.headers.entries()))
          // Handle error, show error message to user
        }
      );

      //setCookie('jsession', userToken);

      // Redirect or navigate to another page upon successful login
      // Example: history.push('/dashboard');
    } catch (error) {
      console.error("Login failed:", error);
      // Handle error, show error message to user
    }
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
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <Link to={state=="login"?"/signup":"/login"}>Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;
