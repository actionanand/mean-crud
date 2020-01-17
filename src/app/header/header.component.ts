import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authSub: Subscription;
  userIsAuthenticated: boolean = false;

  constructor(private authServ: AuthService) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authServ.getIsAuthOk();
    this.authSub = this.authServ.getAuthStatus().subscribe(authInfo => {
      this.userIsAuthenticated = authInfo;
    });
  }

  onLogout(){
    this.authServ.logout();
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

}
