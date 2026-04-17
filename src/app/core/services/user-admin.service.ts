import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, from, switchMap } from 'rxjs'; 

// LA RUTA QUE ME PEDISTE:
import { KeycloakAuthService } from '../auth/services/keycloak-auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserAdminService {
  private http = inject(HttpClient);
  private authService = inject(KeycloakAuthService); 

  private baseUrl = 'https://sso-poc.quito.gob.ec:8443/auth/admin/realms/Municipales';

  getUsers(search: string = ''): Observable<any[]> {
    // 1. Convertimos la Promesa del token en un Observable
    return from(this.authService.getToken()).pipe(
      switchMap(token => {
        // 2. Ahora que tenemos el token, armamos la cabecera
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        
        let params = new HttpParams();
        if (search) {
          params = params.set('search', search);
        }

        // 3. Hacemos la petición con la "llave" en la mano
        return this.http.get<any[]>(`${this.baseUrl}/users`, { params, headers });
      })
    );
  }

  // Si necesitas obtener los roles de un usuario específico:
  getUserRoles(userId: string): Observable<any[]> {
    return from(this.authService.getToken()).pipe(
      switchMap(token => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<any[]>(`${this.baseUrl}/users/${userId}/role-mappings/realm`, { headers });
      })
    );
  }
}