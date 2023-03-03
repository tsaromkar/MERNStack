import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LOGIN_ROUTE, SIGNUP_ROUTE, TODOS_ROUTE } from "./Constants";
import { Todos } from "./Todos";
import { Login, Signup } from "./UserRegistration";

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={LOGIN_ROUTE} element={<Login />} />
          <Route path={SIGNUP_ROUTE} element={<Signup />} />
          <Route path={TODOS_ROUTE} element={<Todos />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
