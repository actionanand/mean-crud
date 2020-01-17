import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SignupComponent } from '../auth/signup/signup.component';
import { LoginComponent } from '../auth/login/login.component';
import { AngularMaterialsModule } from './angular-materials.module';
import { DirectiveModule } from './directive.module';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AngularMaterialsModule,
    DirectiveModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
