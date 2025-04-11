import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://api.securehub.andion.eu/freeipa/allusers")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  // Agrupar usuarios en filas de dos
  const userPairs = [];
  for (let i = 0; i < users.length; i += 2) {
    userPairs.push(users.slice(i, i + 2));
  }

  return (
    <main>
      <h2>All Users</h2>
      <ul className="user-list">
        {userPairs.map((pair, rowIndex) => (
          <li key={rowIndex} className="user-row">
            {pair.map((user, index) => (
              <Link
                key={index}
                to={`/freeipa/user/${user.uid?.[0]}`}
                className="user-button"
              >
                {user.cn?.[0] || "Unknown User"}
              </Link>
            ))}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Users;
