import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);

    await axios.post("http://localhost:3001/users/signin", { username, email, password })
    // Add your login logic here=> for login api endpoint we get token as responce
    //catch the response token that we get back from login=>access token into cookies
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        if (token) {
          localStorage.setItem("jsonwebtoken", token);//storing token in local storage
           //check if status got from backend is True or false, user exist or not
          if (response.data.status === true) {
            alert("Login Successful!!");
            window.location.pathname = "/home";
          } else {
            alert("Invalid!! Try again!!");
            window.location.pathname = "/login";
          }
        }else{
          alert("No User Found!!");
          window.location.pathname = "/login";
        }
      })
      .catch((err) => {
        console.log(err);
      });

    
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
        background: "linear-gradient(to bottom, #b0e0e6, #87ceeb)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          borderRadius: "8px",
          background: "white",
        }}
      >
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              style={{ padding: "5px", width: "100%" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              style={{ padding: "5px", width: "100%" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              style={{ padding: "5px", width: "100%" }}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: "5px 10px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
