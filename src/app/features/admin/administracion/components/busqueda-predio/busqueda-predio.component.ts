import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

export interface BusquedaPredioPayload {
  numeroPredio: string;
}

@Component({
  selector: 'app-busqueda-predio',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './busqueda-predio.component.html',
  styleUrls: ['./busqueda-predio.component.scss']
})
export class BusquedaPredioComponent {

  @Output() buscar = new EventEmitter<BusquedaPredioPayload>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      numeroPredio: [
        '',
        [Validators.required, Validators.maxLength(10)]
      ]
    });
  }

  get f() {
    return this.form.controls;
  }

  buscarPredio(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const valor = this.form.get('numeroPredio')?.value;
    this.buscar.emit({ numeroPredio: String(valor ?? '') });
  }
}
