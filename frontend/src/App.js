import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Groups from "./pages/Groups";
import User from "./pages/User";
import Login from './components/Login';
import "./styles/Global.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/freeipa/allusers" element={<Users />} />
        <Route path="/freeipa/groups" element={<Groups />} />
        <Route path="/freeipa/user/:username" element={<User />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;