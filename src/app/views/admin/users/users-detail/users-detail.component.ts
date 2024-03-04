import {Component, Inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UsersService} from "../../../../services/users.service";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";

@Component({
  selector: 'app-users-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatDialogActions, MatDialogContent, MatDialogTitle, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatDialogClose, MatOptionModule, MatSelectModule],
  templateUrl: './users-detail.component.html',
  styleUrl: './users-detail.component.scss'
})
export class UsersDetailComponent implements OnInit{
  empForm: FormGroup
  roleList: any = ['ADMIN','USER']
  defaultSelectedRole : any

  constructor(private fb:FormBuilder,
              private usersService: UsersService,
              private dialogRef: MatDialogRef<UsersDetailComponent>,
              private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.empForm = this.fb.group({
      name:'',
      username:'',
      role:''
    })
  }

  ngOnInit() {
    this.defaultSelectedRole = this.data.role
    this.empForm.patchValue({
      name: this.data.name,
      username: this.data.username,
      role: this.data.role,
    })
  }

  onFromSubmit() {
    if(this.data){
      this.usersService.updateUser(this.data.id,this.empForm.value).subscribe({
        next: (val : any) => {
          this.snackBar.open('User updated successfully')
          this.dialogRef.close(true)
        },
        error: (err: any) => {
          console.error(err)
        }
      })
    }
  }
}
