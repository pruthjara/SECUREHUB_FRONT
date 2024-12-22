import React from 'react';
import ReactDOM from 'react-dom';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './keycloak';
import App from './App';

ReactDOM.render(
    <ReactKeycloakProvider authClient={keycloak}>
        <App />
    </ReactKeycloakProvider>,
    document.getElementById('root')
);
