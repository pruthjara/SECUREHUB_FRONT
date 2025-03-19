import React from "react";
import "./Databases.css"; // Asegúrate de tener este archivo CSS

const Databases = () => {
  // Lista de bases de datos disponibles en Kubernetes
  const databases = [
    { name: "MariaDB" },
    { name: "MongoDB" },
    { name: "PostgreSQL" },
    { name: "pgAdmin" },
  ];

  return (
    <main className="databases-container">
      <h2>Databases</h2>
      <div className="database-list">
        {databases.reduce((rows, db, index) => {
          if (index % 2 === 0) {
            rows.push([db]);
          } else {
            rows[rows.length - 1].push(db);
          }
          return rows;
        }, []).map((row, rowIndex) => (
          <div key={rowIndex} className="database-row">
            {row.map((db, colIndex) => (
              <div key={colIndex} className="database-box">
                {db.name}
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
};

export default Databases;
