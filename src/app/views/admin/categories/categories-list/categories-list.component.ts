import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {CategoriesService} from "../../../../services/categories.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {CategoriesDetailComponent} from "../categories-detail/categories-detail.component";
import {MatButtonModule} from "@angular/material/button";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule, MatButtonModule],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss'
})

export class CategoriesListComponent implements OnInit {
  categoriesList: any = []
  currentPage: number = 1
  size: number = 10
  totalPages: number = 0
  totalElements: number = 0

  constructor(private categoriesService: CategoriesService, private router: Router, private dialog: MatDialog, private cookieService: CookieService) {
  }
  ngOnInit() {
    this.getList()
  }

  getList() {
    //Lấy thông tin của user từ Session
    /*const userInfoString = sessionStorage.getItem('user_info')
    if(userInfoString!= null){
      const userInfo = JSON.parse(userInfoString)
      console.log(userInfo.user.name)
    }*/
    this.categoriesService.getListByPage(this.currentPage, this.size).subscribe((response: any) => {
      this.categoriesList = response.data.content
      this.totalPages = response.data.totalPages
      this.currentPage = response.data.number + 1
      this.size = response.data.size
      this.totalElements = response.data.totalElements
    }, (error: any) => {
      console.log(error);
    })
  }

  addNewCategory() {
    const dialogRef = this.dialog.open(CategoriesDetailComponent, {
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

  editNewCategory(data: any) {
    const dialogRef = this.dialog.open(CategoriesDetailComponent,{
      width: '600px',
      data,
    });
    dialogRef.afterClosed().subscribe({
      next:(val) => {
        this.getList()
      }
    })
  }

  deleteCategory(id: any) {
    const isConfirmed = confirm('Are you sure you want to delete this category?');
    if (isConfirmed) {
      this.categoriesService.deleteCategory(id).subscribe({
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
