import React from "react";
import { useNavigate } from "react-router-dom";

const DefaultHome = () => {
  const navigate = useNavigate();

  return (
    <div className="mini-dashboard"> 
      <div className="card">
        <h2>Services</h2>
        <div className="users-active" onClick={() => navigate("/databases")}>Databases</div>
        <div className="users-active" onClick={() => navigate("/minio")}>MinIO</div>
      </div>
    </div>
  );
};

export default DefaultHome;
