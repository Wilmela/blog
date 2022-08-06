import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

import "./register.scss";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(false)
  const { username, email, password } = user;

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(false)
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace('/login')
    } catch (error) {
      setError(true)
    }

  };
  return (
    <div className="login">
      <span className="loginTitle">Register</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>
          Username
          <input
            type="text"
            name="username"
            placeholder="Enter your email"
            onChange={handleChange}
          />
        </label>
        <label>
          Email
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
          />
        </label>
        <button type="submit" className="loginButton">
          Register
        </button>
      </form>
      <p className="loginBtn">
        <Link className="link" to="/login">
          Login
        </Link>
      </p>
     { error && <span style={{color:'red', fontSize:'18px'}}>Something went wrong</span>}
    </div>
  );
};

export default Register;
