import Keycloak from 'keycloak-js';

// Configura Keycloak
const keycloak = new Keycloak({
  url: 'http://192.168.100.3:8080/auth', // Cambia a la URL de tu servidor Keycloak
  realm: 'securehub',                // Cambia al realm configurado en Keycloak
  clientId: 'securehub-frontend'    // Cambia al clientId configurado para el frontend
});

export default keycloak;
