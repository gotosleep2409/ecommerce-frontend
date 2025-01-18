import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {TokenStorageService} from "../../../services/token-storage.service";
import {LoginService} from "../../../services/login.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CookieService} from "ngx-cookie-service";
import {UsersService} from "../../../services/users.service";
import {EmailVerificationModalComponent} from "../register/email-verification-modal/email-verification-modal.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  forgetPasswordForm: FormGroup;
  constructor(private userService: UsersService, private router: Router, private snackBar: MatSnackBar, private dialog: MatDialog) {
    this.forgetPasswordForm = new FormGroup({
      username: new FormControl(''),
      email: new FormControl(''),
    });
  }

  onSubmit() {
    if (this.forgetPasswordForm.valid) {
      console.log(this.forgetPasswordForm.value)
      this.userService.forgotPassword(this.forgetPasswordForm.value).subscribe({
        next: (val: any) => {
          this.snackBar.open("Mật khẩu mới đã được gửi về email của bạn");
          this.router.navigate(['/login']);
          },
        error: (err: any) => {
          if (err.status === 404) {
            this.snackBar.open("Tên tài khoản và email không tồn tại!");
          } else {
            this.snackBar.open("Đã xảy ra lỗi, vui lòng thử lại sau!");
          }
          console.error(err);
        }
      });
    }
  }
}
