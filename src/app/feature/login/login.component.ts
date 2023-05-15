import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from 'src/app/app.component';
import { IToken } from 'src/app/core/model/token';
import { AuthenticationService } from 'src/app/core/service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: string = '';
  public password: string = '';

  constructor(
    private appComponent: AppComponent,
    private authenticationService: AuthenticationService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit() {
    this.appComponent.isLoginPage = true;
    this.cleanCookieStorage();
  }

  onLogin(): void {  
    this.authenticationService.getToken(this.user, this.password).subscribe(
      (response: IToken) => {
        const token = response.access_token;
        this.storeToken(token);
        this.redirectToDashboard();
      }
    );
  }

  private cleanCookieStorage(): void {
    this.cookieService.deleteAll();
    // localStorage.clear();
  }

  private storeToken(token: string): void {
    this.cookieService.set('token', token);
    // localStorage.setItem('token', token);
  }

  private redirectToDashboard(): void {
    if(this.cookieService.check('token')) {
      this.router.navigate(['/dashboard'])
    }
  }

}
