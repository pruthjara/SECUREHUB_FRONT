// src/hooks/useUsers.js
import { useState, useEffect } from 'react';
import { getUsers } from '../services/freeIPAService';

function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await getUsers();
        console.log("Usuarios obtenidos:", data); // Verificar datos en la consola
        setUsers(data); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  return { users, loading, error };
}

export default useUsers;

