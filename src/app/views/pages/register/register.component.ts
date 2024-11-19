import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import { MatDialog } from '@angular/material/dialog';
import {RegisterService} from "../../../services/register.service";
import {EmailVerificationModalComponent} from "./email-verification-modal/email-verification-modal.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerFrom: FormGroup;

  constructor(private dialog: MatDialog, private registerService: RegisterService, private router: Router, private snackBar: MatSnackBar) {
    this.registerFrom = new FormGroup({
      name: new FormControl(''),
      username: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      password: new FormControl(''),
      passwordRepeat: new FormControl('')
    });
  }

  onSubmit() {
    if (this.registerFrom.value.name != "" && this.registerFrom.value.username != "" && this.registerFrom.value.password != "" && this.registerFrom.value.passwordRepeat != "") {
      if (this.registerFrom.value.password != this.registerFrom.value.passwordRepeat) {
        this.snackBar.open("The passwords do not match. Please enter the password again.");
      } else {
        this.registerService.register(this.registerFrom.value).subscribe({
          next: (val: any) => {
            if (val) {
              this.snackBar.open("Register successfully");

              const dialogRef = this.dialog.open(EmailVerificationModalComponent, {
                width: '400px',
                data: {}
              });

              dialogRef.afterClosed().subscribe((verificationCode) => {
                if (verificationCode) {
                  this.registerService.verifyEmail(verificationCode).subscribe({
                    next: (verificationResponse) => {
                      this.snackBar.open("Email verified successfully!");
                      this.router.navigate(['/login']);
                    },
                    error: (err) => {
                      this.snackBar.open("Invalid verification code.");
                    }
                  });
                }
              });

            } else {
              this.snackBar.open("Invalid username or password!");
            }
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      }
    } else {
      this.snackBar.open("Yêu cầu nhập đủ dữ liệu");
    }
  }


  backToLogin() {
    this.router.navigate(['/login']);
  }
}
