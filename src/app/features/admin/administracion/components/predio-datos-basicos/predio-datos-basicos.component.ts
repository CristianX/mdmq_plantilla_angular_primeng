import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MaterialModule } from '../../../../../shared/material/material.module';

export interface PredioDatosBasicos {
  numeroPredio?: number | null;
  claveCatastral?: string | null;
  predioAdminZonal?: string | null;
  predioParrroquia?: string | null;
  predioBarrioSector?: string | null;
  predioNomenclatura?: string | null;
  predioCallePrincipal?: string | null;
  predioCalleSecundaria?: string | null;
}

@Component({
  selector: 'app-predio-datos-basicos',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './predio-datos-basicos.component.html',
  styleUrl: './predio-datos-basicos.component.scss',
})
export class PredioDatosBasicosComponent {
  private _data: PredioDatosBasicos | null = null;

  @Input() set data(value: PredioDatosBasicos | null) {
    this._data = value;
    this.form.patchValue(value ?? {}, { emitEvent: false });
  }

  get data(): PredioDatosBasicos | null {
    return this._data;
  }

  readonly form: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      numeroPredio: [null],
      claveCatastral: [null],
      predioAdminZonal: [null],
      predioParrroquia: [null],
      predioBarrioSector: [null],
      predioNomenclatura: [null],
      predioCallePrincipal: [null],
      predioCalleSecundaria: [null],
    });
  }

}
