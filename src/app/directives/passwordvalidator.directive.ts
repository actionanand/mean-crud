import { Directive, Attribute } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appPasswordvalidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useClass: PasswordvalidatorDirective,
      multi: true
    }
  ]
})

export class PasswordvalidatorDirective implements Validator {
  passSubscription: Subscription;
  constructor(@Attribute('appPasswordvalidator') public passwordControl: string) { }

  validate(c: FormControl) {

    const password = c.root.get(this.passwordControl);
    const confirmPassword = c;

    if (confirmPassword.value === null) {
      return null;
    }

    if (password) {
      this.passSubscription  = password.valueChanges.subscribe(() => {
        confirmPassword.updateValueAndValidity();
        this.passSubscription.unsubscribe();
      });
    }
    return password && password.value !== confirmPassword.value ? { passwordMatchError: true } : null;
  }

}
