import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DefaultHome.css";

const DefaultHome = ({ user }) => {
  const [userData, setUserData] = useState(null);
  const [failedLogin, setFailedLogin] = useState(null);
  const [expiredPassword, setExpiredPassword] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.preferred_username) return;

    // Obtener información del usuario autenticado
    fetch(`http://138.4.11.249:9000/freeipa/user/${user.preferred_username}`)
      .then(response => response.json())
      .then(data => {
        console.log("User data:", data);
        setUserData({
          name: data.cn?.[0],
          role: data.memberof_role?.length > 0 ? data.memberof_role.join(", ") : "Sin rol",
          failedLogin: formatDate(data.krblastfailedauth?.[0]),
          passwordExpired: isPasswordExpired(data.krbpasswordexpiration?.[0]),
        });

        setFailedLogin(data.krblastfailedauth?.[0] ? formatDate(data.krblastfailedauth?.[0]) : null);
        setExpiredPassword(isPasswordExpired(data.krbpasswordexpiration?.[0]));
      })
      .catch(error => console.error("Error fetching user data:", error));
  }, [user]);

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
    <div className="default-dashboard">
      {/* Último fallo de inicio de sesión */}
      {failedLogin && (
        <div className="default-card3">
          <h2>Last Failed Login</h2>
          <p>{failedLogin}</p>
        </div>
      )}

     {/* Información del usuario autenticado */}
      {userData && (
        <div className="default-card default-clickable" onClick={() => navigate(`/freeipa/user/${user.preferred_username}`)}>
        <h2>Your Profile</h2>
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Role:</strong> {userData.role}</p>
        </div>
      )}

      {/* Estado de la contraseña */}
      {expiredPassword === "Expirada" && (
        <div className="default-card3">
          <h2>Password Expiration</h2>
          <p>⚠️ Your password is expired</p>
        </div>
      )}

      {/* Servicios disponibles */}
      <div className="default-card">
        <h2>Services</h2>
        <div className="default-users-active" onClick={() => navigate("/databases")}>Databases</div>
        <div className="default-users-active" onClick={() => window.location.href = "https://minio-console.andion.eu"}>MinIO</div>
        <div className="default-users-active" onClick={() => navigate("/vpn-request")}>Request VPN</div>
      </div>
    </div>
  );
};

export default DefaultHome;
