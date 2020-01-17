import { Directive } from '@angular/core';
import { Validator, NG_VALIDATORS, ValidatorFn, FormControl } from '@angular/forms';

@Directive({
  selector: '[appPasswordstrength]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useClass: PasswordstrengthDirective,
      multi: true
    }
  ]
})
export class PasswordstrengthDirective implements Validator{

  validator: ValidatorFn;
  constructor() {
    this.validator = this.passwordStrength();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }

  passwordStrength(): ValidatorFn {
    return (control: FormControl) => {
      if (control.value != null && control.value !== '') {
        let isValid = /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/.test(control.value);
        if (isValid) {
          return null;
        } else {
          return {
            passwordstrength: { valid: false }
          };
        }
      } else {
        return null;
      }
    };
  }
}
