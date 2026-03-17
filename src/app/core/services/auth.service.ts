import { Injectable } from '@angular/core';
import { KeycloakAuthService } from '../auth/services/keycloak-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private keycloakAuthService: KeycloakAuthService) {}

  login() {
    return this.keycloakAuthService.login();
  }

  logout(redirect: boolean) {
    return this.keycloakAuthService.logout(redirect);
  }

  isAuthenticated(): boolean {
    return this.keycloakAuthService.isLoggedIn();
  }

  getToken(): string | undefined {
    return this.keycloakAuthService.getToken();
  }
}
