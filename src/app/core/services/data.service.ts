import { Injectable } from '@angular/core';
import { ApiUrlService } from './api-url.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private apiUrlService: ApiUrlService) {}

  getBaseUrl(): string {
    return this.apiUrlService.base;
  }

  getEndpointUrl(endpoint: string): string {
    return this.apiUrlService.build(endpoint);
  }
}
