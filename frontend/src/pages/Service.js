import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Service.css";

const Services = () => {
  const navigate = useNavigate();
  const [showDatabases, setShowDatabases] = useState(false);

  const databases = [
    { name: "PostgreSQL" },
    { name: "MySQL" },
    { name: "MongoDB" },
    { name: "Redis" },
  ];

  return (
    <main className="services-container">
      <h2>Available Services</h2>

      {/* 📌 Botón para mostrar las bases de datos */}
      <button className="service-button" onClick={() => setShowDatabases(!showDatabases)}>
        {showDatabases ? "Hide Databases" : "Show Databases"}
      </button>

      {/* 📌 Lista de bases de datos (solo si está activado) */}
      {showDatabases && (
        <div className="database-list">
          {databases.map((db, index) => (
            <div key={index} className="database-item">
              {db.name}
            </div>
          ))}
        </div>
      )}

      {/* 📌 Otros servicios */}
      <div className="services-options">
        <button className="service-button" onClick={() => window.location.href = "https://minio-console.andion.eu"}>
          MinIO
        </button>
        <button className="service-button" onClick={() => navigate("/vpn-request")}>
          Request VPN
        </button>
      </div>
    </main>
  );
};

export default Services;

