import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Subscription} from "rxjs";
import {CartService} from "../../../../services/cart.service";

@Component({
  selector: 'app-cart-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-info.component.html',
  styleUrl: './cart-info.component.scss'
})
export class CartInfoComponent implements OnInit{
  cartItem = []
  cartSubscription: Subscription
  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    this.cartSubscription = this.cartService.getCartItem().subscribe(items => {
      this.cartItem = items
    })

  }

  quantityCart(){
    return this.cartService.countCart()
  }
  calculateCartTotal() {
    return this.cartService.cartTotal
  }

}
