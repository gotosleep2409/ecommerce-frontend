import {Component, Inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {TokenStorageService} from "../../../../../services/token-storage.service";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {UsersService} from "../../../../../services/users.service";

@Component({
  selector: 'app-detail-user',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatDialogActions, MatDialogContent, MatDialogTitle, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatDialogClose],
  templateUrl: './detail-user.component.html',
  styleUrl: './detail-user.component.scss'
})
export class DetailUserComponent implements OnInit{
  empForm: FormGroup
  isChangePassword: boolean = false
  previousName: any
  previousPhone: any
  previousEmail: any
  constructor(private tokenStorageService: TokenStorageService,private fb:FormBuilder,
              private dialogRef: MatDialogRef<DetailUserComponent>,
              private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private userService : UsersService) {
    this.empForm = this.fb.group({
      name:'',
      username:['' ,Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      previousPassword:'',
      newPassword:''
    })
  }
  getUser(){
    this.userService.getUserById(this.tokenStorageService.getUser().id).subscribe((value:any)=>{
      this.tokenStorageService.saveUser(value.data)
    })
  }
  ngOnInit() {
    this.empForm.patchValue(this.tokenStorageService.getUser())
    this.previousName = this.tokenStorageService.getUser().name
    this.previousPhone = this.tokenStorageService.getUser().phone
    this.previousEmail = this.tokenStorageService.getUser().email
    this.getUser()
  }

  onFromSubmit() {
    if(this.empForm.valid){
      if(this.empForm.value.previousPassword.trim() != '' && this.empForm.value.newPassword.trim() != ''){
        const data = {
          id : this.tokenStorageService.getUser().id,
          name : this.empForm.value.name,
          previousPassword: this.empForm.value.previousPassword,
          newPassword: this.empForm.value.newPassword,
        }
        this.userService.changePassword(data.id, data).subscribe( {
          next: (val : any) => {
            this.snackBar.open('Password updated')
            this.dialogRef.close(true)
            this.getUser()
          },
          error: (err: any) => {
            console.error(err)
          }
        })
      }
      else {
        const data = {
          id : this.tokenStorageService.getUser().id,
          name : this.empForm.value.name,
          phone: this.empForm.value.phone,
          email: this.empForm.value.email
        }
        this.userService.updateUser(data.id, data).subscribe( {
          next: (val : any) => {
            this.snackBar.open('Profile updated')
            this.dialogRef.close(true)
            this.getUser()
          },
          error: (err: any) => {
            console.error(err)
          }
        })
      }
    }

  }

  changePassword() {
    if(this.isChangePassword == true){
      this.isChangePassword = false
      this.empForm.value.previousPassword = ""
      this.empForm.value.newPassword = ""
    }
    else {
      this.isChangePassword = true
    }
  }

  handleChanges(): boolean {
    let dataChanged = false;
    if (this.empForm.value.name.trim() !== '' && this.empForm.value.name.trim() !== this.previousName) {
      dataChanged = true
    }
    if (this.empForm.value.previousPassword.trim() !== '' && this.empForm.value.newPassword.trim() !== '') {
      dataChanged = true
    }
    if (this.empForm.value.previousPhone !== '' && this.empForm.value.phone !== '') {
      dataChanged = true
    }
    if (this.empForm.value.previousEmail !== '' && this.empForm.value.email !== '') {
      dataChanged = true
    }
    return dataChanged
  }
}
