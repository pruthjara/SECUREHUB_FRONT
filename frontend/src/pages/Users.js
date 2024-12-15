import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://138.4.11.247:9000/freeipa/allusers")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <main>
      <h2>All Users</h2>
      <ul className="user-list">
        {users.map((user, index) => (
          <li key={index}>
            <Link to={`/freeipa/user/${user.uid?.[0]}`} className="user-button">
              {user.cn?.[0] || "Unknown User"}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Users;