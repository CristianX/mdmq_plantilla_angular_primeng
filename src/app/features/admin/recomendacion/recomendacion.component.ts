import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../shared/material/material.module';
import { UntypedFormBuilder, UntypedFormGroup, AbstractControl, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card'; // 👈 IMPORTANTE

import { CustomizerSettingsService } from '../../../shared/components/customizer-settings/customizer-settings.service';
import { CustomValidators } from '../../../shared/validators/custom-validators';
import { InformacionGeneralComponent } from '../recomendacion/informacion-general/informacion-general.component';
import { BusquedaPredioComponent } from '../administracion/components/busqueda-predio/busqueda-predio.component';

@Component({
  selector: 'app-recomendacion',
  standalone: true, // 🔥 ESTO FALTABA
  imports: [
    MaterialModule,
    MatCardModule,
    InformacionGeneralComponent,
    BusquedaPredioComponent
  ],
  templateUrl: './recomendacion.component.html',
  styleUrl: './recomendacion.component.scss'
})
export class RecomendacionComponent {

  form!: UntypedFormGroup;
  @ViewChild('stepper') stepper!: MatStepper;

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  hide = true;
  isToggled = false;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    public themeService: CustomizerSettingsService
  ){

    this.form = this._formBuilder.group({
      numeroPredio: [null, [Validators.required, Validators.maxLength(10), CustomValidators.onlyNumbers]],
      datosGenerales: _formBuilder.group({ data: [] })
    });

    this.themeService.isToggled$.subscribe(isToggled => {
      this.isToggled = isToggled;
    });

  }

  onBuscar(value: { numeroPredio?: number | null }): void {
    this.form.patchValue({
      numeroPredio: value.numeroPredio ?? null,
      datosGenerales: {
        numeroPredio: value.numeroPredio ?? null,
        claveCatastral: null,
        predioAdminZonal: null,
        predioParrroquia: null,
        predioBarrioSector: null,
        predioNomenclatura: null,
        predioCallePrincipal: null,
        predioCalleSecundaria: null,
      }
    });
  }

}
