import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignUp } from "./views/signUp";
import SignIn from "./views/signIn";
import injectContext from "./store/appContext";
import { Clients } from "./views/clients";
import { EditClient } from "./views/editClient";
import { AddClient } from "./views/addClient";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/addClient" element={<AddClient />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/editClient" element={<EditClient />} />
          <Route path="/editClient/:id" element={<EditClient />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default injectContext(App);
