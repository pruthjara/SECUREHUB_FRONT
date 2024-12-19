import axios from 'axios';
import { keycloak } from '@react-keycloak/web'; // Usamos la instancia Keycloak del contexto

// Base URL del backend
const API_BASE_URL = 'http://138.4.11.247:9000/freeipa';

// Configuración del cliente Axios con Interceptores
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor para agregar el token de Keycloak al encabezado Authorization
apiClient.interceptors.request.use(
  async (config) => {
    // Verifica si Keycloak está autenticado
    if (keycloak.authenticated) {
      const token = await keycloak.token;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Métodos para interactuar con el backend
export const fetchUserDetails = (username) => {
  return apiClient.get(`/user/${username}`);
};

export const fetchAllUsers = () => {
  return apiClient.get(`/allusers`);
};

export const fetchGroups = () => {
  return apiClient.get(`/groups`);
};

export const login = (username, password) => {
  return apiClient.post(`/login`, { username, password });
};
