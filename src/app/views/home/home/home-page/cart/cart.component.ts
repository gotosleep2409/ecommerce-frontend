import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CartItemComponent} from "./cart-item/cart-item.component";
import {CartService} from "../../../../../services/cart.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CartItemComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  cartItem = []
  cartSubscription: Subscription;
  constructor(private cartService: CartService) {
  }
  ngOnInit() {
    this.cartSubscription = this.cartService.getCartItem().subscribe(items => {
      this.cartItem = items;
    });
  }

  clearCart() {
    this.cartService.clearCart();
  }

  calculateCartTotal() {
    return this.cartService.cartTotal
  }
}
