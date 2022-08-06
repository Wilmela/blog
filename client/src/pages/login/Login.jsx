import axios from "axios";
import { useContext } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import "./login.scss";

const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();

  const { dispatch, isFetching } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">LOGIN</span>
      <form onSubmit={handleSubmit} className="loginForm">
        <label>
          Username
          <input type="text" ref={userRef} placeholder="Enter your username" />
        </label>
        <label>
          Password
          <input
            type="password"
            ref={passwordRef}
            placeholder="Enter your password"
          />
        </label>
        <button disabled={isFetching} type="submit" className="loginButton">
          login
        </button>
      </form>
      <p className="registerButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
