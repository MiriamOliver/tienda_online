import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

const confirmarPasswd = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {

    const valor = control.value;

    if (!valor) {
      return null;
    }

    return !(valor.passwd == valor.passwdConf) ? { confirmarPasswd: true } : null;
  }
}

export {
  confirmarPasswd
}
