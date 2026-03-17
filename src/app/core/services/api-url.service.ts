import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlService {
  private readonly baseUrl = environment.url_backend.replace(/\/+$/, '');

  get base(): string {
    return this.baseUrl;
  }

  build(endpoint: string): string {
    const normalizedEndpoint = endpoint.replace(/^\/+/, '');
    return `${this.baseUrl}/${normalizedEndpoint}`;
  }
}
