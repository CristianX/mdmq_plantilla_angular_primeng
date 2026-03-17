import { Component } from '@angular/core';
import { Button } from 'primeng/button';


@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [Button],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss',
})
export class UsuariosComponent {
  text: string | undefined;
}
