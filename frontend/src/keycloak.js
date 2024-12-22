import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'http://138.4.11.247:8080',
    realm: 'master',
    clientId: 'frontend-client',
});

export default keycloak;
