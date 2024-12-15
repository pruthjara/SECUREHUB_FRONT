import React, { useState, useEffect } from "react";
import "./Groups.css";

const Groups = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetch("http://138.4.11.247:9000/freeipa/groups")
      .then((res) => res.json())
      .then((data) => setGroups(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <main>
      <h2>All Groups</h2>
      <ul>
        {groups.map((group, index) => (
          <li key={index}>
            <strong>{group.cn?.[0]}</strong> ({group.description?.[0]})
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Groups;