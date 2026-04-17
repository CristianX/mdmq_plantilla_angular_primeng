import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, AbstractControl, Validators } from '@angular/forms';
import { MatStepperModule, MatStepper } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { CustomizerSettingsService } from '../../../shared/components/customizer-settings/customizer-settings.service';
import { CustomValidators } from '../../../shared/validators/custom-validators';

import { InformacionGeneralComponent } from '../recomendacion/informacion-general/informacion-general.component';
import { BusquedaPredioComponent, BusquedaPredioPayload } from '../administracion/components/busqueda-predio/busqueda-predio.component';

@Component({
  selector: 'app-recomendacion',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatStepperModule,
    InformacionGeneralComponent,
    BusquedaPredioComponent
  ],
  templateUrl: './recomendacion.component.html',
  styleUrls: ['./recomendacion.component.scss']
})
export class RecomendacionComponent {

  form!: UntypedFormGroup;

  @ViewChild('stepper') stepper!: MatStepper;

  hide = true;
  isToggled = false;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    public themeService: CustomizerSettingsService
  ) {

    this.form = this._formBuilder.group({
      numeroPredio: [
        null,
        [Validators.required, Validators.maxLength(10), CustomValidators.onlyNumbers]
      ],
      datosGenerales: this._formBuilder.group({
        data: []
      })
    });

    this.themeService.isToggled$.subscribe(isToggled => {
      this.isToggled = isToggled;
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onBuscar(data: BusquedaPredioPayload) {
    console.log('Evento completo:', data);

    this.form.patchValue({
      numeroPredio: data.numeroPredio
    });
  }
}
