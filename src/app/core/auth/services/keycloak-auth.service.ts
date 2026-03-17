import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakLoginOptions } from 'keycloak-js';
import { environment } from '../../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class KeycloakAuthService {

  keycloakLoginOptions: KeycloakLoginOptions = {
    redirectUri: environment.home_page
  }
  constructor(
    private keycloakService: KeycloakService,
    private route: Router,
  ) { }

  getLoggedUser() {
    try {
      let userDetails = this.keycloakService.getKeycloakInstance().idTokenParsed;
      console.log(userDetails);
      return userDetails;
    } catch (e) {
      return undefined
    }
  }
  logout(redirect: boolean) {
    if (redirect) {
      this.keycloakService.logout(this.keycloakLoginOptions.redirectUri);
    } else {
      this.keycloakService.logout();
    }

  }
  login() {
    this.keycloakService.login(this.keycloakLoginOptions);
  }
  redirectToProfile() {
    this.keycloakService.getKeycloakInstance().accountManagement();
  }
  getRoles() {
    let roles = this.keycloakService.getKeycloakInstance().resourceAccess

    if (roles![environment.keycloakConfig.clientId]) {
      return roles![environment.keycloakConfig.clientId].roles;
    }
    return []
  }

  getNombreRol(role: string): string {

    const roleMap: any = {
      'ROL_SERD_ADMIN': 'ADMINISTRADOR SERD',
      'ROL_IEM_ADMIN': 'ADMINISTRADOR IEM',
      'ROL_IEM_OPERATIVO': 'OPERATIVO IEM',
      'ROL_SERD_REPORTES': 'USUARIO REPORTES',
      'ROL_CALIFICACION_NEE': 'CALIFICACION NEE',
      'ROL_CALIFICACION_VUL': 'CALIFICACION VULNERABILIDAD',
      'ROL_CALIFICACION_VUL_INT': 'CALIFICACION VULNERABILIDAD INTERMEDIO',
      'ROL_COMISION_VUL': 'COMISION VULNERABILIDAD',
      'ROL_COMISION_NEE': 'COMISION NECESIDADES',
      'ROL_COMISION_VUL_INT': 'COMISION VULNERABILIDAD INTERMEDIO',
      'ROL_VOZ_VUL': 'USUARIO VOZ VULNERABILIDAD',
      'ROL_VOZ_NEE': 'USUARIO VOZ NECESIDADES',
      'ROL_ASPIRANTE': 'USUARIO ASPIRANTE'
    };

    return roleMap[role] || role;
  }

  redirectToMenu() {
    if (this.keycloakService.getKeycloakInstance().authenticated) {
      this.route.navigate(['']);
    }
  }
  public isLoggedIn(): boolean {
    return this.keycloakService.isLoggedIn();
  }

  IsAuthenticated() {
    return this.keycloakService.getKeycloakInstance().authenticated;
  }

  getToken() {
    return this.keycloakService.getToken();
  }

  keycloakEvents() {
    return this.keycloakService.keycloakEvents$.asObservable();
  }

  actualizarToken(time: number) {
    return this.keycloakService.updateToken(time);
  }

  setSesionExpirada() {
    localStorage.setItem('session_expired', 'true');
  }
  getSesionExpirada() {
    let sesion: any = localStorage.getItem('session_expired');
    return JSON.parse(sesion);
  }



}
