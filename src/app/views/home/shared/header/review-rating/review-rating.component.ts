import {Component, Inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {TokenStorageService} from "../../../../../services/token-storage.service";
import {BillService} from "../../../../../services/bill.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-review-rating',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './review-rating.component.html',
  styleUrl: './review-rating.component.scss'
})
export class ReviewRatingComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private tokenStorage : TokenStorageService,
              private billService: BillService,
              private dialogRef: MatDialogRef<ReviewRatingComponent>,
              private snackBar: MatSnackBar,) {
  }

  ngOnInit() {
    console.log(this.data)
  }

  stars: boolean[] = Array(5).fill(false)
  rating: number = 0
  review: string = ''

  selectStar(starIndex: number) {
    this.rating = starIndex + 1;
    this.stars = this.stars.map((_, i) => i <= starIndex)
  }

  submitReview() {
    if (this.rating > 0 && this.review) {
      let data = {
        rating: this.rating,
        review: this.review,
        productId: this.data.productId,
        billId: this.data.billId,
        userId: this.tokenStorage.getUser().id
      }
      this.billService.createReview(data).subscribe( {
        next: (val : any) => {
          this.snackBar.open('Reviewed successfully')
          this.dialogRef.close(true)
        },
          error: (err: any) => {
          console.error(err)
        }
      })
    } else {
      alert("Please select a rating and provide a review before submitting.")
    }
  }
  /*resetForm() {
    this.rating = 0
    this.review = ''
    this.stars.fill(false)
  }*/

}
