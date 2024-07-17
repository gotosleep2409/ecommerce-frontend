import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {NgxPaginationModule} from "ngx-pagination";
import {BillService} from "../../../../services/bill.service";
import {MatDialog} from "@angular/material/dialog";
import {OrdersDetailComponent} from "../orders-detail/orders-detail.component";


@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, NgxPaginationModule],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.scss'
})
export class OrdersListComponent implements OnInit{
  ordersList: any = []
  currentPage: number = 1
  size: number = 10
  totalPages: number = 0
  totalElements: number = 0
  status: any = ''
  paymentMethod: any = ''
  paymentStatus: any = ''

  constructor(private billService : BillService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getList()
  }

  onPageChange($event: number) {
    this.currentPage = $event
    this.getList()
  }

  getList(){
    this.billService.getOrderList(this.currentPage, this.size, this.paymentMethod, this.paymentStatus, this.status).subscribe((response: any) => {
      this.ordersList = response.data.content
      this.totalPages = response.data.totalPages
      this.currentPage = response.data.number + 1
      this.size = response.data.size
      this.totalElements = response.data.totalElements
    }, (error: any) => {
      console.log(error);
    })
  }

  editOrder(data: any) {
    const dialogRef = this.dialog.open(OrdersDetailComponent,{
      width: '800px',
      data,
    });
    dialogRef.afterClosed().subscribe({
      next:(val) => {
        this.getList()
      }
    })
  }

  deleteOrder(id: any) {
    const isConfirmed = confirm('Are you sure you want to delete this category?');
    if (isConfirmed) {
      this.billService.deleteBill(id).subscribe({
        next: (res) => {
          this.getList()
        },
        error: (err) => {
          console.error('Error deleting category', err)
        }
      });
    }
  }

  onSearchInputChanged() {
    this.currentPage = 1
    this.getList()
  }
}
