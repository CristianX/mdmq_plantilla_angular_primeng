import { Validators, ValidatorFn, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
import { verificarCedula, verificarRuc } from 'udv-ec';


export class CustomValidators extends Validators {

  static onlyNumbers(control: AbstractControl): ValidationErrors | null {
    return /^\d+$/.test(control.value) ? null : { onlyNumbers: true };
  }

  static onlyNumbersDec(control: AbstractControl): ValidationErrors | null {
    return /^\d+(\.\d+)?$/.test(control.value) ? null : { onlyNumbers: true };
  }

  static mustBeEqual(nombrePrimerControl: string, nombreSegundoControl: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const primerControl = group.get(nombrePrimerControl);
      const segundoControl = group.get(nombreSegundoControl);
      return primerControl?.value === segundoControl?.value ? null : { mustBeEqual: true };
    };
  }
  
  static atLeastOneNumber(control: AbstractControl): ValidationErrors | null {
    return /\d+/.test(control.value) ? null : { toNumber: true };
  }

  static atLeastOneUppercase(control: AbstractControl): ValidationErrors | null {
    return /[A-Z]+/.test(control.value) ? null : { atLeastOneUppercase: true };
  }

  static atLeastOneLowercase(control: AbstractControl): ValidationErrors | null {
    return /[a-z]+/.test(control.value) ? null : { atLeastOneLowercase: true };
  }

  
  static mustBeDifferent(firstField: string, secondField: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const firstControl = group.get(firstField);
      const secondControl = group.get(secondField);
      return firstControl?.value != secondControl?.value ? null : { mustBeDifferent: true };
    };
  }

  static soloNumeros(control: AbstractControl): ValidationErrors | null {
    let valor = control.value || '';
    if (valor) {
        const regex = /^[0-9]*$/;
        if (regex.test(valor)) {
            return null
        }
        return { soloNumeros: true }
    } else {
        return { soloNumeros: true }
    }
}
static numerosNegativos(control: AbstractControl): ValidationErrors | null {
    let valor = control.value || 0;
    if (valor > 0) {
        return null
    } else {
        return { numerosNegativos: true }
    }
}

static validarRucOCedula(control: AbstractControl): ValidationErrors | null {
    let valor = control.value || 0;
    if (verificarCedula(valor) || verificarRuc(valor)) {
        return null
    } else {
        return { validarRucOCedula: true }
    }
}

static noSpecialCharsValidator(control: AbstractControl): ValidationErrors | null {
    const valor = control.value;
    if (!valor) {
        return null;
    }
    const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(valor);
    if (!hasSpecialChars) {
        return null;
    } else {
        return { specialChars: true };
    }
}


static MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
            return;
        }

        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

static passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value || '';
    const upperCaseCharacters = /[A-Z]+/g;
    const numberCharacters = /[0-9]+/g;

    if (!upperCaseCharacters.test(value)) {
        return { passwordStrength: 'La contraseña debe contener al menos una letra mayúscula.' };
    }

    if (!numberCharacters.test(value)) {
        return { passwordStrength: 'La contraseña debe contener al menos un número.' };
    }

    return null;
}

static trueValueValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value !== true) {
        return { valueNotTrue: 'El valor debe ser verdadero.' };
    }
    return null;
}

static formatRule(control: AbstractControl): ValidationErrors | null {
    const valor = control.value || '';
    // Esta regex valida que la cadena esté formada por palabras en minúsculas y/o números separados por guiones bajos
    const regex = /^[a-z0-9]+(_[a-z0-9]+)*$/;
    if (regex.test(valor)) {
        return null;
    } else {
        return { formatRule: true };
    }
}
  
}
