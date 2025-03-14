import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const MiniDashboard = () => {
  const [users, setUsers] = useState([]);
  const [rolesData, setRolesData] = useState([]);
  const [failedLogins, setFailedLogins] = useState([]);
  const [expiredPasswords, setExpiredPasswords] = useState([]);
  const navigate = useNavigate(); // Hook para la navegación

  useEffect(() => {
    fetch("http://138.4.11.249:9000/freeipa/allusers")
      .then(response => response.json())
      .then(data => {
        const parsedUsers = data.map(user => ({
          id: user.uid?.[0],
          name: user.cn?.[0],
          role: user.memberof_role?.length > 0 ? user.memberof_role.join(", ") : "Sin rol",
          failedLogin: formatDate(user.krblastfailedauth?.[0]),
          passwordExpired: isPasswordExpired(user.krbpasswordexpiration?.[0])
        }));

        setUsers(parsedUsers.slice(0, 4)); // Solo mostrar los primeros 4 usuarios en Home

        // 📊 Calcular la distribución de roles en el gráfico
        const roleCounts = parsedUsers.reduce((acc, user) => {
          const roles = user.role.split(", ");
          roles.forEach(role => {
            acc[role] = (acc[role] || 0) + 1;
          });
          return acc;
        }, {});

        const chartData = Object.keys(roleCounts).map((role) => ({
          name: role,
          value: roleCounts[role],
        }));
        setRolesData(chartData);

        // ❌ Usuarios con intentos fallidos de autenticación
        setFailedLogins(parsedUsers.filter(user => user.failedLogin !== "No data"));

        // ⚠️ Usuarios con contraseñas expiradas
        setExpiredPasswords(parsedUsers.filter(user => user.passwordExpired === "Expirada"));
      })
      .catch(error => console.error("Error fetching users:", error));
  }, []);

  // 🔹 Función para formatear fechas de FreeIPA
  const formatDate = (ipaDate) => {
    if (!ipaDate) return "No data";
    try {
      const date = new Date(
        ipaDate.substring(0, 4), 
        ipaDate.substring(4, 6) - 1, 
        ipaDate.substring(6, 8),
        ipaDate.substring(8, 10), 
        ipaDate.substring(10, 12), 
        ipaDate.substring(12, 14)
      );
      return date.toLocaleString();
    } catch (e) {
      return "Invalid date";
    }
  };

  // 🔹 Función para determinar si la contraseña está expirada
  const isPasswordExpired = (expirationDate) => {
    if (!expirationDate) return "No data";
    const expDate = new Date(
      expirationDate.substring(0, 4), 
      expirationDate.substring(4, 6) - 1, 
      expirationDate.substring(6, 8)
    );
    return expDate < new Date() ? "Expirada" : "Válida";
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="mini-dashboard">
      {/* Usuarios Activos (Botón que lleva a /users) */}
      <button className="card users-active" onClick={() => navigate("/freeipa/allusers")}>
        <h2>Active Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </button>

      {/* Gráfico de Distribución de Roles */}
      <div className="card2">
        <h2>Roles Distribution</h2>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={rolesData}
              cx="50%"
              cy="50%"
              outerRadius={60}
              fill="#FFFFFF"
              dataKey="value"
              label
              isAnimationActive={false}
            >
              {rolesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFFFFF", // Fondo blanco puro
                color: "#000000", // Texto negro
                borderRadius: "8px",
                border: "1px solid #ddd", // Borde gris sutil
                fontSize: "14px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Sombra ligera
              }}
              labelStyle={{
                color: "#000000", // Título negro
                fontWeight: "bold",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Últimos Intentos Fallidos de Inicio de Sesión */}
      <div className="card">
        <h2>Last Failed Login Attempts</h2>
        <ul>
          {failedLogins.slice(0, 5).map((user) => (
            <li key={user.id}>{user.name} : {user.failedLogin}</li>
          ))}
        </ul>
      </div>

      {/* Usuarios con Contraseña Expirada */}
      <div className="card">
        <h2>Users With Expired Password</h2>
        <ul>
          {expiredPasswords.length > 0 ? (
            expiredPasswords.slice(0, 5).map((user) => (
              <li key={user.id}>{user.name} - ⚠️ Contraseña expirada</li>
            ))
          ) : (
            <li>No hay usuarios con contraseña expirada</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MiniDashboard;
