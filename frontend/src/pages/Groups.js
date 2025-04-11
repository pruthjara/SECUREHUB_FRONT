import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Groups.css";

const Groups = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetch("https://api.securehub.andion.eu/freeipa/groups")
      .then((res) => res.json())
      .then((data) => setGroups(data))
      .catch((err) => console.error(err));
  }, []);

  // Agrupar grupos en filas de dos
  const groupPairs = [];
  for (let i = 0; i < groups.length; i += 2) {
    groupPairs.push(groups.slice(i, i + 2));
  }

  return (
    <main>
      <h2>All Groups</h2>
      <ul className="group-list">
        {groupPairs.map((pair, rowIndex) => (
          <li key={rowIndex} className="group-row">
            {pair.map((group, index) => (
              <Link
                key={index}
                to={`/freeipa/group/${group.cn?.[0]}`}
                className="group-button"
              >
                {group.cn?.[0]}
              </Link>
            ))}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Groups;
