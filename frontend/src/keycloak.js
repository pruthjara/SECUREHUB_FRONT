import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'http://192.168.100.3:8080',
    realm: 'master',
    clientId: 'frontend-client',
});

export default keycloak;
