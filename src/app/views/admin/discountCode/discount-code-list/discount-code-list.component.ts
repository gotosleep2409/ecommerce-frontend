import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {NgxPaginationModule} from "ngx-pagination";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CategoriesDetailComponent} from "../../categories/categories-detail/categories-detail.component";
import {CategoriesService} from "../../../../services/categories.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {CookieService} from "ngx-cookie-service";
import {DiscountCodeService} from "../../../../services/discountCode.service";
import {DiscountCodeDetailComponent} from "../discount-code-detail/discount-code-detail.component";

@Component({
  selector: 'app-discount-code-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, NgxPaginationModule, ReactiveFormsModule, FormsModule],
  templateUrl: './discount-code-list.component.html',
  styleUrl: './discount-code-list.component.scss'
})
export class DiscountCodeListComponent {
  categoriesList: any = []
  currentPage: number = 1
  size: number = 10
  totalPages: number = 0
  totalElements: number = 0

  constructor(private categoriesService: CategoriesService, private dialog: MatDialog, private discountCodeService: DiscountCodeService) {
  }
  ngOnInit() {
    this.getList()
  }
  getList() {
    this.discountCodeService.getListByPage(this.currentPage, this.size).subscribe((response: any) => {
      this.categoriesList = response.data.content
      this.totalPages = response.data.totalPages
      this.currentPage = response.data.number + 1
      this.size = response.data.size
      this.totalElements = response.data.totalElements
    }, (error: any) => {
      console.log(error);
    })
  }

  addNewCode() {
    const dialogRef = this.dialog.open(DiscountCodeDetailComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe({
      next:(val) => {
        this.getList()
      }
    })
  }

  onPageChange($event: number) {
    this.currentPage = $event
    this.getList()
  }

  editCode(data: any) {
    const dialogRef = this.dialog.open(DiscountCodeDetailComponent,{
      width: '600px',
      data,
    });
    dialogRef.afterClosed().subscribe({
      next:(val) => {
        this.getList()
      }
    })
  }

  deleteCode(id: any) {
    const isConfirmed = confirm('Are you sure you want to delete this code?');
    if (isConfirmed) {
      this.discountCodeService.deleteDiscountCode(id).subscribe({
        next: (res) => {
          this.getList()
        },
        error: (err) => {
          console.error('Error deleting category', err)
        }
      });
    }
  }
}
