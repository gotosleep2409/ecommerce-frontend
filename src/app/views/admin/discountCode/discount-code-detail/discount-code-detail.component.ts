import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {CategoriesService} from "../../../../services/categories.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DiscountCodeService} from "../../../../services/discountCode.service";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

@Component({
  selector: 'app-discount-code-detail',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogActions, MatDialogContent, MatDialogTitle, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatDialogClose, MatSlideToggleModule],
  templateUrl: './discount-code-detail.component.html',
  styleUrl: './discount-code-detail.component.scss'
})
export class DiscountCodeDetailComponent {
  empForm: FormGroup

  constructor(private fb:FormBuilder,
              private discountCodeService: DiscountCodeService,
              private dialogRef: MatDialogRef<DiscountCodeDetailComponent>,
              private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.empForm = this.fb.group({
      name:'',
      code:'',
      percentDiscount:'',
      duration: true
    })
  }

  ngOnInit() {
    this.empForm.patchValue(this.data)
  }

  onFromSubmit() {
    if(this.empForm.valid){
      if(this.data){
        this.discountCodeService.updateDiscountCode(this.data.id,this.empForm.value).subscribe({
          next: (val : any) => {
            this.snackBar.open('Code updated successfully')
            this.dialogRef.close(true)
          },
          error: (err: any) => {
            console.error(err)
          }
        })
      }
      else {
        this.discountCodeService.addDiscountCode(this.empForm.value).subscribe({
          next: (val : any) => {
            this.snackBar.open('Code added successfully')
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
