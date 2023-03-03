import React, { useCallback, useState } from "react";
import { LOGIN_ROUTE } from "../../Constants";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSetName = useCallback(
    (e) => {
      setName(e.target.value);
    },
    [setName]
  );

  const handleSetEmail = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [setEmail]
  );

  const handleSetPassword = useCallback(
    (e) => {
      setPassword(e.target.value);
    },
    [setPassword]
  );

  const userSignup = useCallback(
    async (e) => {
      e.preventDefault();
      if (name === "" || email === "" || password === "") {
        alert("Please enter valid name, email and password");
        return;
      }

      const res = await fetch("http://localhost:1337/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();
      const { user, message } = data;
      if (user) {
        alert(message);
        window.location.href = LOGIN_ROUTE;
      } else {
        alert(message);
      }
    },
    [name, email, password]
  );

  return (
    <form onSubmit={userSignup}>
      <input
        type="text"
        name="name"
        placeholder="Enter Name"
        text={name}
        onChange={handleSetName}
      />
      <br />
      <input
        type="text"
        name="email"
        placeholder="Enter Email"
        text={email}
        onChange={handleSetEmail}
      />
      <br />
      <input
        type="text"
        name="password"
        placeholder="Enter Password"
        text={password}
        onChange={handleSetPassword}
      />
      <br />
      <input type="submit" value="Submit" />
      <input
        type="button"
        value="Login"
        onClick={() => (window.location.href = LOGIN_ROUTE)}
      />
    </form>
  );
};

export default Signup;
