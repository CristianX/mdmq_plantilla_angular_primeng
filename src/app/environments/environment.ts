import { KeycloakConfig } from "keycloak-js";

const keycloakConfig: KeycloakConfig = {
    url: 'https://sso-poc.quito.gob.ec:8443/auth/',
    realm: 'Municipales',
    clientId: 'app-siem',
};

export const environment = {
    production: false,
    offline: false,
    multiTenant: true,
    home_page: 'http://localhost:4200/',
    url_artes_api: 'https://ssomdmq.quito.gob.ec:5043/api/imagen/',
    keycloakConfig,
    url_backend: 'http://172.16.20.16/MDMQ_SIEM_API_DESA/api/',
};
