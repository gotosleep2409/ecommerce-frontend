import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {LoginService} from "../../../services/login.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CookieService} from "ngx-cookie-service";
import {TokenStorageService} from "../../../services/token-storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup
  constructor(private tokenStorageService: TokenStorageService, private loginService: LoginService, private router: Router, private snackBar: MatSnackBar, private cookieService: CookieService) {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  onSubmit() {
    if(this.loginForm.valid){
      this.loginService.login(this.loginForm.value).subscribe({
        next: (val : any) => {
          if (val.accessToken) {
            this.tokenStorageService.saveToken(val.accessToken)
            this.tokenStorageService.saveUser(val.user)
            if(val.user.role == 'ADMIN') {
              sessionStorage.setItem('user_info', JSON.stringify(val))
              this.cookieService.set('access_token', val.accessToken, undefined, "/")
              this.router.navigate(['/admin'])
            }
            else {
              sessionStorage.setItem('user_info', JSON.stringify(val))
              this.router.navigate(['/home'])
            }
          } else {
            this.snackBar.open("Invalid username or password!")
          }
        },
        error: (err: any) => {
          console.error(err)
        }
      })
    }
  }
  onClickRegister(){
    this.router.navigate(['/register']);
  }

}
