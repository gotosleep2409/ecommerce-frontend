import {Component, Inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {
  MAT_DIALOG_DATA, MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {CategoriesService} from "../../../../services/categories.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-categories-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogClose, MatInputModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatButtonModule],
  templateUrl: './categories-detail.component.html',
  styleUrl: './categories-detail.component.scss'
})
export class CategoriesDetailComponent implements OnInit{

  empForm: FormGroup

  constructor(private fb:FormBuilder,
              private categoriesService: CategoriesService,
              private dialogRef: MatDialogRef<CategoriesDetailComponent>,
              private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.empForm = this.fb.group({
      name:'',
      imageUrl:''
    })
  }

  ngOnInit() {
   this.empForm.patchValue(this.data)
  }

  onFromSubmit() {
    if(this.empForm.valid){
      if(this.data){
        this.categoriesService.updateCategory(this.data.id,this.empForm.value).subscribe({
          next: (val : any) => {
            this.snackBar.open('Category updated successfully')
            this.dialogRef.close(true)
          },
          error: (err: any) => {
            console.error(err)
          }
        })
      }
      else {
        this.categoriesService.addCategory(this.empForm.value).subscribe({
          next: (val : any) => {
            this.snackBar.open('Category added successfully')
            this.dialogRef.close(true)
          },
          error: (err: any) => {
            console.error(err)
          }
        })
      }
    }
  }
}
