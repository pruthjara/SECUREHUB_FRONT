// src/containers/HomePage.js
import React from 'react';
import useUsers from '../hooks/useUsers';
import UserList from '../components/UserList';

function HomePage() {
  const { users, loading, error } = useUsers();

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <UserList users={users} />
    </div>
  );
}

export default HomePage;
