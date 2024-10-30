export async function getUsers() {
  const response = await fetch('http://138.4.11.247:9000/api/freeipa/users'); // URL completa del backend
  if (!response.ok) {
    throw new Error('Error al obtener usuarios');
  }
  const data = await response.json();
  console.log("Datos recibidos del backend:", data); // Para verificar los datos
  return data;
}
