import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./GroupDetails.css";

const GroupDetails = () => {
  const { groupname } = useParams();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
     setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
     fetch(`http://138.4.11.249:9000/freeipa/groups/${groupname}`)
          .then((res) => res.json())
          .then((data) => {
            setGroup(data);
            setLoading(false);
          })
          .catch((err) => {
            console.error(err);
            setLoading(false);
          });
      }, [groupname]);
    
      if (loading) return <p>Loading...</p>;

  if (loading) return <p className="loading">Cargando...</p>;


  return (
    <div className="group-details">
      <h2>Group Details: {group.cn?.[0]}</h2>
      <p><strong>Description:</strong> {group.description?.[0] || "Sin descripción"}</p>
      <p><strong>GID Number:</strong> {group.gidnumber?.[0]}</p>
      <p><strong>Group members:</strong> {group.member_user?.join(", ") || "No hay miembros"}</p>
    </div>
  );
};

export default GroupDetails;
