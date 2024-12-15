import axios from 'axios';

// Base URL del backend
const API_BASE_URL = 'http://138.4.11.247:9000/freeipa';

const BASE_URL = 'http://138.4.11.247:9000';

export const fetchUserDetails = (username) => {
  return axios.get(`${API_BASE_URL}/user/${username}`);
};

export const fetchAllUsers = () => {
  return axios.get(`${API_BASE_URL}/allusers`);
};

export const fetchGroups = () => {
  return axios.get(`${API_BASE_URL}/groups`);
};


export const login = (username, password) => {
  return axios.post(`${BASE_URL}/login`, { username, password });
};

