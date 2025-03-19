import React from "react";
import "./Home.css";
import MiniDashboard from "./MiniDashboard";
import DefaultHome from "./DefaultHome"; // Nuevo componente

const Home = ({ user }) => {
  return (
    <div className="mini-dashboard-container">
      {user?.preferred_username === "pruth" ? (
        <MiniDashboard />
      ) : (
        <DefaultHome user={user} /> // Componente diferente si no es "pruth"
      )}
    </div>
  );
};

export default Home;


