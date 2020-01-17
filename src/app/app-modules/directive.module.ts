import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordvalidatorDirective } from '../directives/passwordvalidator.directive';
import { EmailvalidatorDirective } from '../directives/emailvalidator.directive';
import { PasswordstrengthDirective } from '../directives/passwordstrength.directive';

@NgModule({
  declarations: [
    PasswordvalidatorDirective,
    EmailvalidatorDirective,
    PasswordstrengthDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PasswordvalidatorDirective,
    EmailvalidatorDirective,
    PasswordstrengthDirective 
  ]
})
export class DirectiveModule { }
