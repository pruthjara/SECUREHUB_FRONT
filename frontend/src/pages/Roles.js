import React, { useState, useEffect } from "react";
import "./Roles.css";

const Roles = () => {
  const [rolesData, setRolesData] = useState({});
  const [expandedRole, setExpandedRole] = useState(null);

  useEffect(() => {
    fetch("https://api.securehub.andion.eu/freeipa/allusers")
      .then((res) => res.json())
      .then((data) => {
        console.log("Usuarios recibidos:", data); 

        const roleMap = {};

        data.forEach((user) => {
          const roles = user.memberof_role || [];
          console.log(`Usuario: ${user.cn?.[0]} - Roles:`, roles); 

          roles.forEach((role) => {
            if (!roleMap[role]) {
              roleMap[role] = [];
            }
            roleMap[role].push(user.cn?.[0] || "Unknown User");
          });
        });

        console.log("Mapa de roles:", roleMap); 
        setRolesData(roleMap);
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const toggleRole = (role) => {
    setExpandedRole(expandedRole === role ? null : role);
  };

  return (
    <main className="roles-container">
      <h2>Roles & Assigned Users</h2>
      <ul className="roles-list">
        {Object.keys(rolesData).length > 0 ? (
          Object.entries(rolesData).map(([role, users]) => (
            <li key={role} className="role-item">
              <button className="role-button" onClick={() => toggleRole(role)}>
                {role} ({users.length}) {/* 📌 Muestra el número de usuarios */}
              </button>
              {expandedRole === role && (
                <ul className="users-list">
                  {users.map((user, index) => (
                    <li key={index} className="user-item">{user}</li>
                  ))}
                </ul>
              )}
            </li>
          ))
        ) : (
          <p className="loading">Loading roles...</p>
        )}
      </ul>
    </main>
  );
};

export default Roles;
