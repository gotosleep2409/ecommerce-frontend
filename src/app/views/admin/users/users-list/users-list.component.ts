import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {NgxPaginationModule} from "ngx-pagination";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {CookieService} from "ngx-cookie-service";
import {UsersService} from "../../../../services/users.service";
import {CategoriesDetailComponent} from "../../categories/categories-detail/categories-detail.component";
import {UsersDetailComponent} from "../users-detail/users-detail.component";

@Component({
  selector: 'app-users-list',
  standalone: true,
    imports: [CommonModule, FormsModule, MatButtonModule, NgxPaginationModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit{
  userList: any = []
  currentPage: number = 1
  size: number = 10
  totalPages: number = 0
  totalElements: number = 0

  constructor(private usersService: UsersService, private router: Router, private dialog: MatDialog, private cookieService: CookieService) {
  }
  ngOnInit() {
    this.getList()
  }

  getList() {
    this.usersService.getListByPage(this.currentPage, this.size).subscribe((response: any) => {
      this.userList = response.data.content
      this.totalPages = response.data.totalPages
      this.currentPage = response.data.number + 1
      this.size = response.data.size
      this.totalElements = response.data.totalElements
    }, (error: any) => {
      console.log(error);
    })
  }
  onPageChange($event: number) {
    this.currentPage = $event
    this.getList()
  }


  deleteUser(id: any) {
    const isConfirmed = confirm('Are you sure you want to delete this user?');
    if (isConfirmed) {
      this.usersService.deleteUser(id).subscribe({
        next: (res) => {
          this.getList();
        },
        error: (err) => {
          console.error('Error deleting user', err);
        }
      });
    }
  }

  editUser(data: any) {
    const dialogRef = this.dialog.open(UsersDetailComponent,{
      width: '600px',
      data,
    });
    dialogRef.afterClosed().subscribe({
      next:(val) => {
        this.getList()
      }
    })
  }
}
