import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {TokenStorageService} from "../../../../../services/token-storage.service";
import {BillService} from "../../../../../services/bill.service";
import {MatDialog} from "@angular/material/dialog";
import {ReviewRatingComponent} from "../review-rating/review-rating.component";

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.scss'
})
export class TransactionHistoryComponent implements OnInit{
  transactionHistory : any
  constructor(private tokenStorageService: TokenStorageService, private billService: BillService, private dialog: MatDialog) {
  }
  ngOnInit() {
    this.billService.getBillDetailByUserId(this.tokenStorageService.getUser().id).subscribe((val: any) => {
      this.transactionHistory = val.data.content
    })
  }

  viewDetail(item: any) {
    item.expanded = !item.expanded
    this.billService.getBillDetailByBillId(item.id).subscribe({
      next: (val : any) => {
        item.products = val.products
      }
    })
  }

  reviews(productId: any, billId: any){
    const dialogRef = this.dialog.open(ReviewRatingComponent,{
      width: '400px',
      data: {
        billId: billId,
        productId: productId
      }
    })
    dialogRef.afterClosed().subscribe({
      next:(val) => {
        this.ngOnInit()
      }
    })
  }
}
