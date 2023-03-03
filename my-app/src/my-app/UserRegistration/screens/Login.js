import React, { useCallback, useState } from "react";
import { TODOS_ROUTE, SIGNUP_ROUTE, MY_APP_JWT } from "../../Constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const userLogin = useCallback(
    async (e) => {
      e.preventDefault();
      if (email === "" || password === "") {
        alert("Please enter valid email and password");
        return;
      }

      const res = await fetch("http://localhost:1337/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
      const { user, message, jwt } = data;
      if (user) {
        localStorage.setItem(MY_APP_JWT, jwt);
        window.location.href = TODOS_ROUTE;
      } else {
        alert(message);
      }
    },
    [email, password]
  );

  return (
    <form onSubmit={userLogin}>
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
        value="Register"
        onClick={() => (window.location.href = SIGNUP_ROUTE)}
      />
    </form>
  );
};

export default Login;
