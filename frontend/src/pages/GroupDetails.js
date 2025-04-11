import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./GroupDetails.css";

const GroupDetails = () => {
  const { groupname } = useParams();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.securehub.andion.eu/freeipa/groups/${groupname}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error en la respuesta del servidor");
        return res.json();
      })
      .then((data) => {
        console.log("✅ Grupo recibido:", data);
        setGroup(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error al cargar grupo:", err);
        setLoading(false);
      });
  }, [groupname]);

  if (loading) return <p className="loading">Cargando grupo...</p>;
  if (!group) return <p className="error">Grupo no encontrado.</p>;

  return (
    <div className="group-details">
      <h2>Detalles del grupo: {group.cn?.[0] || "Sin nombre"}</h2>
      <p><strong>Descripción:</strong> {group.description?.[0] || "Sin descripción"}</p>
      <p><strong>GID Number:</strong> {group.gidnumber?.[0] || "No disponible"}</p>
      <p><strong>DN:</strong> {group.dn || "No disponible"}</p>
      <p><strong>SID:</strong> {group.ipantsecurityidentifier?.[0] || "No disponible"}</p>
      <p><strong>Clases:</strong> {group.objectclass?.join(", ") || "No disponibles"}</p>

      <Link to="/freeipa/groups" className="back-button">← Volver al listado</Link>
    </div>
  );
};

export default GroupDetails;

