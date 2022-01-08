import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Footer from "./Footer";

const Login = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);

  const emailHandler = (e) => {
    setEmail(e.target.value);
    localStorage.setItem("email", e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    localStorage.setItem("password", e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    let password = localStorage.getItem("password");
    let email = localStorage.getItem("email");

    if (email === "" && password === "") {
      alert("Please enter valid details");
    } else {
      const newDetails = { email, password };
      setData(...data, newDetails);
      setEmail("");
      setPassword("");
      history.push("/products");
      window.location.reload(false);
    }
  };

  return (
    <div className="login">
      <form className="login__form" onSubmit={submitHandler}>
        <h1>Login here</h1>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={emailHandler}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={passwordHandler}
        />
        <button type="submit" className="btn btn-dark">
          Login
        </button>
      </form>

      <Footer />
    </div>
  );
};

export default Login;
