import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArtesService {

  constructor(
  ) { }

  getImagen(imagen: string){
    const image = `${environment.url_artes_api}/devolverImagen/secretaria/${imagen}`;
    return image;
  }
}
