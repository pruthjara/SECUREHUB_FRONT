import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./User.css";



const User = () => {
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
      fetch(`https://api.securehub.andion.eu/freeipa/user/${username}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });

  
    }, [username]);
  
    if (loading) return <p>Loading...</p>;

    return (
      <div className="user-details">
        <h2>User Details</h2>

        <p><strong>Nombre:</strong> {user.cn?.[0]}</p>
        <p><strong>Usuario (UID):</strong> {user.uid?.[0]}</p>
        <p><strong>Email:</strong> {user.mail?.[0] || "No proporcionado"}</p>
        <p><strong>UID Number:</strong> {user.uidnumber?.[0]}</p>
        <p><strong>GID Number:</strong> {user.gidnumber?.[0]}</p>
        <p><strong>Home Directory:</strong> {user.homedirectory?.[0]}</p>
        <p><strong>Shell:</strong> {user.loginshell?.[0]}</p>
        <p><strong>Último Intento Fallido:</strong> {formatDate(user.krblastfailedauth?.[0]) || "No fallos registrados"}</p>
        <p><strong>Contraseña Expira:</strong> {formatDate(user.krbpasswordexpiration?.[0]) || "No disponible"}</p>
        <p><strong>Cuenta Bloqueada:</strong> {user.nsaccountlock ? "Sí 🔴" : "No 🟢"}</p>
        <p><strong>Grupos:</strong> {user.memberof_group?.join(", ") || "No pertenece a ningún grupo"}</p>
        <p><strong>Roles:</strong> {user.memberof_role?.join(", ") || "No tiene roles asignados"}</p>
      </div>
    );
};


const formatDate = (ipaDate) => {
  if (!ipaDate) return null;
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
    return "Fecha inválida";
  }
};

export default User;
