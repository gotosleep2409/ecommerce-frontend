import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {TokenStorageService} from "../../../../../services/token-storage.service";
import {BillService} from "../../../../../services/bill.service";

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.scss'
})
export class TransactionHistoryComponent implements OnInit{
  transactionHistory : any
  constructor(private tokenStorageService: TokenStorageService, private billService: BillService) {
  }
  ngOnInit() {
    this.billService.getBillDetailByUserId(this.tokenStorageService.getUser().id).subscribe((val: any) => {
      this.transactionHistory = val.data.content
      console.log(this.transactionHistory)
    })
  }

  viewDetail(id: any) {
    console.log(id)
  }
}
