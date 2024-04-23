import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Subscription} from "rxjs";
import {CartService} from "../../../../../services/cart.service";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-cart-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cart-detail.component.html',
  styleUrl: './cart-detail.component.scss'
})
export class CartDetailComponent implements OnInit{
  cartItem = []
  cartSubscription: Subscription

  constructor(private cartService: CartService,
              private dialogRef: MatDialogRef<CartDetailComponent>,) {
  }

  ngOnInit() {
    this.cartSubscription = this.cartService.getCartItem().subscribe(items => {
      this.cartItem = items
    })
  }

  calculateCartTotal() {
    return this.cartService.cartTotal
  }

  updateTotal() {
    this.cartService.calculateTotal()
  }

  removeItem(item: any) {
    this.cartService.removeProduct(item)
  }

  checkOut(){
    this.dialogRef.close(true)
  }
}
