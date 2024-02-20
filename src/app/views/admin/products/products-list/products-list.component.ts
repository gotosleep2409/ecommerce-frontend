import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {CategoriesService} from "../../../../services/categories.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {NgxPaginationModule} from "ngx-pagination";
import {MatButtonModule} from "@angular/material/button";
import {ProductsService} from "../../../../services/products.service";
import {CategoriesDetailComponent} from "../../categories/categories-detail/categories-detail.component";
import {ProductsActionComponent} from "../products-action/products-action.component";

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule, MatButtonModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements OnInit {
  productList: any = []
  currentPage: number = 1
  size: number = 10
  totalPages: number = 0
  totalElements: number = 0

  constructor(private productsService: ProductsService, private router: Router, private dialog: MatDialog) {
  }
  ngOnInit() {
    this.getList()
  }

  getList(){
    this.productsService.getListByPage(this.currentPage, this.size).subscribe((response: any) => {
      this.productList = response.data.content
      console.log(this.productList)
      this.totalPages = response.data.totalPages
      this.currentPage = response.data.number + 1
      this.size = response.data.size
      this.totalElements = response.data.totalElements
    }, (error: any) => {
      console.log(error);
    })
  }
  addNewProduct() {
    const dialogRef = this.dialog.open(ProductsActionComponent, {
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

  editProduct(data: any) {
    const dialogRef = this.dialog.open(ProductsActionComponent,{
      width: '600px',
      data,
    });
    dialogRef.afterClosed().subscribe({
      next:(val) => {
        this.getList()
      }
    })
  }

  deleteProduct(id: any) {
    const isConfirmed = confirm('Are you sure you want to delete this product?');
    if (isConfirmed) {
      this.productsService.deleteProduct(id).subscribe({
        next: (res) => {
          this.getList();
        },
        error: (err) => {
          console.error('Error deleting product', err);
        }
      });
    }
  }

}
