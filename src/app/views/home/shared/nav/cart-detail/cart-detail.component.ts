import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Subscription} from "rxjs";
import {CartService} from "../../../../../services/cart.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-cart-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart-detail.component.html',
  styleUrl: './cart-detail.component.scss'
})
export class CartDetailComponent implements OnInit{
  cartItem = []
  cartSubscription: Subscription

  constructor(private cartService: CartService) {
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
}
