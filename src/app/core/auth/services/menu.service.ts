import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from '../../core/models/Menu'
import { ApiUrlService } from '../../core/services/api-url.service';


@Injectable({
  providedIn: 'root'
})

export class MenuService {

  constructor(
    private http: HttpClient,
    private apiUrlService: ApiUrlService
  ) { }

  menu(user: string): Observable<Menu>{
    const body = {
      user
    };
    return this.http.post<Menu>(this.apiUrlService.build('getMenu'), body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
}
