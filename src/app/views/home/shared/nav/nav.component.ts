import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {CartService} from "../../../../services/cart.service";
import {CategoriesDetailComponent} from "../../../admin/categories/categories-detail/categories-detail.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CartDetailComponent} from "./cart-detail/cart-detail.component";
import {RouterLink} from "@angular/router";
import {TokenStorageService} from "../../../../services/token-storage.service";
import {NgIf} from "@angular/common";
import {
  ButtonDirective,
  DropdownComponent,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownToggleDirective
} from "@coreui/angular";
import {TransactionHistoryComponent} from "../header/transaction-history/transaction-history.component";
import {DetailUserComponent} from "../header/detail-user/detail-user.component";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterLink,
    NgIf,
    DropdownComponent,
    DropdownToggleDirective,
    ButtonDirective,
    DropdownMenuDirective,
    DropdownItemDirective
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{
  countCart = 0
  dialogRef: MatDialogRef<CartDetailComponent> | null = null
  isLoggedIn: any
  role: any
  username: any

  constructor(private cartService : CartService, private dialog: MatDialog, private tokenStorageService: TokenStorageService) {
  }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken()
    if(this.isLoggedIn){
      const user = this.tokenStorageService.getUser()
      this.role = user.role
      this.username = user.username
    }
    this.cartService.getCartItem().subscribe(res=>{
      this.countCart = res.length
    })
  }

  viewDetailCart() {
    if (this.dialogRef) {
      this.dialogRef.close()
      this.dialogRef = null
      return
    }

    this.dialogRef = this.dialog.open(CartDetailComponent, {
      width: '800px',
    });

    this.dialogRef.afterClosed().subscribe({
      next: (val) => {
        this.dialogRef = null;
      }
    })
  }

  logout() {
    this.tokenStorageService.signOut()
    window.location.reload()
  }

  viewDetailUser() {
    const dialogRef = this.dialog.open(DetailUserComponent,{
      width: '600px',
    })
    dialogRef.afterClosed().subscribe({
      next:(val) => {
      }
    })
  }

  viewTransactionHistory() {
    const dialogRef = this.dialog.open(TransactionHistoryComponent,{
      width: '800px',
    })
    dialogRef.afterClosed().subscribe({
      next:(val) => {
      }
    })
  }
}
