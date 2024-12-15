import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./User.css";

const User = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://138.4.11.247:9000/freeipa/user/${username}`)
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
      <p>
        <strong>Name:</strong> {user.cn?.[0]}
      </p>
      <p>
        <strong>Email:</strong> {user.mail?.[0] || "No email provided"}
      </p>
      <p>
        <strong>UID:</strong> {user.uidnumber?.[0]}
      </p>
      <p>
        <strong>Home Directory:</strong> {user.homedirectory?.[0]}
      </p>
    </div>
  );
};

export default User;