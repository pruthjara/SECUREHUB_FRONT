// src/components/UserList.js
import React from 'react';
import './UserList.css'; // Importamos el archivo CSS de estilos

function UserList({ users }) {
  return (
    <div className="user-list-container">
      <header className="header">
        <img src="/dit-logo.png" alt="Logo STRAST" className="logo" />
        <h1>SECUREHUB - Users</h1>
      </header>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.uid} className="user-card">
            <h2>{user.fullName}</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>UID:</strong> {user.uid}</p>
            <p><strong>Última Conexión:</strong> {new Date(user.lastLogin).toLocaleString()}</p>
            <p><strong>Estado:</strong> 
              <span className={`status ${user.status === 'active' ? 'active' : 'inactive'}`}>
                {user.status}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;



