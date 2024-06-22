import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import "../styles/Login.css";
import ApiService from "../api/apiService";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setSession, clearSession } from "../redux/feautures/sessionSlice";
import Toast, { ToastType, Position } from "./Toast"; // Adjust the path based on your file structure

const Login: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const session = useAppSelector((state) => state.session); // Assuming you have a session slice in your Redux store
  const [cookies, setCookie, removeCookie] = useCookies(["jsession"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState("login");

  useEffect(() => {
    console.log(session); //debug
  }, []);

  useEffect(() => {
    if (location.pathname === "/login") {
      setState("login");
    } else if (location.pathname === "/signup") {
      setState("signup");
    }
  }, [location.pathname]);

  const getNameOfPage = () => {
    switch (state) {
      case "signup":
        return "Sign Up";
      case "login":
        return "Login";
      default:
        return "";
    }
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await ApiService.login(login, password);
      console.log(response);
      const id = response.id;
      dispatch(setSession({ id: id, username: login, loggedIn: true }));
      navigate(`/profile/${login}`);
    } catch (error) {
      console.error("Login failed:", error);
      setError("Failed to login. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  // Redirect to profile page if session is active
  useEffect(() => {
    if (session.loggedIn) {
      navigate(`/profile/${session.username}`);
    }
  }, [session, session.username, navigate]);

  // If already logged in, don't render the login page
  if (session.loggedIn) {
    return null; // or any other component or loading indicator
  }

  return (
    <div className="login-wrapper">
      <div className="login-form">
        <div className="login-title">
          <FontAwesomeIcon icon={faRightToBracket} size="2xl" />
          <h2>{getNameOfPage()}</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={login}
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
        <Link to={state === "login" ? "/signup" : "/login"}>Sign Up</Link>
      </div>
      {error && (
        <Toast
          message={error}
          type={ToastType.ERROR}
          position={Position.BOTTOM_RIGHT}
          autoHide={true}
          duration={5000}
          onClose={() => setError(null)}
        />
      )}
    </div>
  );
};

export default Login;
