import { Component } from '@angular/core';
import { MaterialModule } from '../../../../shared/material/material.module';
import { CustomizerSettingsService } from '../../../../shared/common/customizer-settings/customizer-settings.service';
import { FormBuilder, UntypedFormGroup, UntypedFormControl, AbstractControl, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { CustomValidators } from '../../../../shared/validators/custom-validators';

@Component({
    selector: 'app-informacion-general',
    imports: [MaterialModule],
    templateUrl: './informacion-general.component.html',
    styleUrl: './informacion-general.component.scss'
})
export class InformacionGeneralComponent {

  form: UntypedFormGroup = new UntypedFormGroup({});

  onChange: any = () => { };
  onTouched: any = () => { };

  subscriptions: Subscription[] = [];

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  get value(): any {

    return this.form.value;

  }

  set value(value: any) {

    this.form.setValue(value);
    this.onChange(value);
    this.onTouched();

  }

  hide = true;
  isToggled = false;

  constructor(
    private formBuilder: FormBuilder,
    public themeService: CustomizerSettingsService
  ) {
    this.form = this.formBuilder.group({
      
      numeroPredio: [null, [Validators.required, Validators.maxLength(10), CustomValidators.onlyNumbers]],
      claveCatastral: [null, [Validators.required]],
      predioAdminZonal: [null, [Validators.required]],
      predioParrroquia: [null, [Validators.required]],
      predioBarrioSector: [null, [Validators.required]],
      predioNomenclatura: [null, [Validators.required]],
      predioCallePrincipal: [null, [Validators.required]],
      predioCalleSecundaria: [null, [Validators.required]],

    });
    
    this.themeService.isToggled$.subscribe(isToggled => { this.isToggled = isToggled });

    this.subscriptions.push(this.form.valueChanges.subscribe((value: any) => {
      this.onChange(value);
      this.onTouched();
    })
    );
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  writeValue(value: any) {
    if (value) {
      this.value = value;
    }

    if (value === null) {
      this.form.reset();
    }
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  validate(_: UntypedFormControl) {
    return this.form.valid ? null : { invalidForm: { valid: false, errors: this.form.errors } };
  }

  verificarValido() {
    const invalidFields = this.getInvalidControls(this.form);
    console.log('Campos no válidos:', invalidFields);
    // if (invalidFields.length === 0) {
    //     this.buscarPredio();
    // }
}

  getInvalidControls(form: FormGroup): string[] {
    const invalidControls = [];
    const controls = form.controls;

    for (const name in controls) {
      if (controls[name].invalid) {
        invalidControls.push(name);
      }
    }
    return invalidControls;
  }

}
