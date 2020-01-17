import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  showPass:boolean = false;
  private authSub: Subscription;
  
  constructor(private authServ: AuthService) { }

  ngOnInit() {
    this.authSub = this.authServ.getAuthStatus().subscribe(status => {
      this.isLoading = status;
    });
  }

  onSignup(form: NgForm){
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authServ.createUser(form.value.email, form.value.password);
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

}
