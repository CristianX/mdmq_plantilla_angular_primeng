import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-predio-datos-basicos',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './predio-datos-basicos.component.html',
  styleUrls: ['./predio-datos-basicos.component.scss']
})
export class PredioDatosBasicosComponent {

  @Input() data: any = {};
}