import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MiniDashboard = () => {
  const [users, setUsers] = useState([]);
  const [rolesData, setRolesData] = useState([]);
  const [failedLogins, setFailedLogins] = useState([]);
  const [expiredPasswords, setExpiredPasswords] = useState([]);
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://138.4.11.249:9000/freeipa/allusers")
      .then(response => response.json())
      .then(data => {
        console.log("Usuarios recibidos:", data);

        const parsedUsers = data.map(user => ({
          id: user.uid?.[0],
          name: user.cn?.[0],
          role: user.memberof_role?.length > 0 ? user.memberof_role.join(", ") : "Sin rol",
          failedLogin: formatDate(user.krblastfailedauth?.[0]),
          passwordExpired: isPasswordExpired(user.krbpasswordexpiration?.[0]),
        }));

        setUsers(parsedUsers.slice(0, 4));

        const roleCounts = parsedUsers.reduce((acc, user) => {
          if (!user.role || user.role === "Sin rol") return acc;
          const roles = user.role.split(", ");
          roles.forEach(role => {
            acc[role] = (acc[role] || 0) + 1;
          });
          return acc;
        }, {});

        const roleList = Object.entries(roleCounts).map(([role, count]) => ({
          name: role,
          count,
        }));

        console.log("Lista de Roles:", roleList);
        setRolesData(roleList);

        setFailedLogins(parsedUsers.filter(user => user.failedLogin !== "No data"));
        setExpiredPasswords(parsedUsers.filter(user => user.passwordExpired === "Expirada"));
      })
      .catch(error => console.error("Error fetching users:", error));

    fetch("http://138.4.11.249:9000/freeipa/groups")
      .then(response => response.json())
      .then(data => setGroups(data.slice(0, 4)))
      .catch(error => console.error("Error fetching groups:", error));
  }, []);

  const formatDate = (ipaDate) => {
    if (!ipaDate) return "No data";
    try {
      return new Date(
        ipaDate.substring(0, 4),
        ipaDate.substring(4, 6) - 1,
        ipaDate.substring(6, 8),
        ipaDate.substring(8, 10),
        ipaDate.substring(10, 12)
      ).toLocaleString();
    } catch {
      return "Invalid date";
    }
  };

  const isPasswordExpired = (expirationDate) => {
    if (!expirationDate) return "No data";
    const expDate = new Date(
      expirationDate.substring(0, 4),
      expirationDate.substring(4, 6) - 1,
      expirationDate.substring(6, 8)
    );
    return expDate < new Date() ? "Expirada" : "Válida";
  };

  return (
    <div className="mini-dashboard">
      {/* Fila 1 */}
      <div className="card3">
        <h2>Expired Password</h2>
        <ul>
          {expiredPasswords.length > 0 ? (
            expiredPasswords.slice(0, 5).map(user => (
              <li key={user.id}>{user.name} - ⚠️ Expired</li>
            ))
          ) : (
            <li>No expired passwords</li>
          )}
        </ul>
      </div>

      <div className="card" onClick={() => navigate("/roles")} style={{ cursor: "pointer" }}>
        <h2>Roles Distribution</h2>
        <ul>
          {rolesData.length > 0 ? (
            rolesData.map((role, index) => (
              <li key={index}>
                {role.name}
              </li>
            ))
          ) : (
            <li>No role data available</li>
          )}
        </ul>
      </div>

      <div className="card" onClick={() => navigate("/freeipa/allusers")} style={{ cursor: "pointer" }}>
        <h2>Active Users</h2>
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>

      {/* Fila 2 */}
      <div className="card3">
        <h2>Failed Login Attempts</h2>
        <ul>
          {failedLogins.slice(0, 5).map(user => (
            <li key={user.id}>{user.name} : {user.failedLogin}</li>
          ))}
        </ul>
      </div>

      <div className="card4">
        <h2>Services</h2>
        <div className="users-active" onClick={() => navigate("/databases")}>Databases</div>
        <div className="users-active" onClick={() => window.location.href = "https://minio-console.andion.eu"}>MinIO</div>
        <div className="users-active" onClick={() => navigate("/vpn-request")}>Request VPN</div> {/* 🔹 Nuevo botón */}
      </div>

      {/* Lista de Roles en lugar del gráfico */}
      <div className="card" onClick={() => navigate("/freeipa/groups")} style={{ cursor: "pointer" }}>
        <h2>Groups</h2>
        <ul>
          {groups.map(group => (
            <li key={group.cn?.[0]}>{group.cn?.[0]}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MiniDashboard;
