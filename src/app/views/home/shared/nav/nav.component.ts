import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {CartService} from "../../../../services/cart.service";
import {CategoriesDetailComponent} from "../../../admin/categories/categories-detail/categories-detail.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CartDetailComponent} from "./cart-detail/cart-detail.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterLink
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{
  countCart = 0
  dialogRef: MatDialogRef<CartDetailComponent> | null = null

  constructor(private cartService : CartService, private dialog: MatDialog) {
  }

  ngOnInit() {
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
}