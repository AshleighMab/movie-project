import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await fetch("https://localhost:44311/api/services/app/Person/CreatePerson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await result.json();

      console.log(data); // do something with the API response
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ background: "#3f0f3f", height: "100vh" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <form onSubmit={handleSubmit}>
          <label htmlFor="username" style={{ color: "#fff", display: "block" }}>
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginBottom: "10px", padding: "10px" }}
          />

          <label htmlFor="password" style={{ color: "#fff", display: "block" }}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: "10px", padding: "10px" }}
          />

          <button type="submit" style={{ padding: "10px 20px" }}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
