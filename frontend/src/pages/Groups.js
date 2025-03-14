import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Groups.css";

const Groups = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetch("http://138.4.11.249:9000/freeipa/groups")
      .then((res) => res.json())
      .then((data) => setGroups(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <main>
      <h2>All Groups</h2>
      <ul className="group-list">
        {groups.map((group, index) => (
          <li key={index}>
            <Link to={`/freeipa/group/${group.cn?.[0]}`} className="group-button">
              {group.cn?.[0]}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Groups;
