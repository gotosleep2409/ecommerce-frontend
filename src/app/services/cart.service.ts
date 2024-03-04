/*
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItem = []
  cartTotal = 0
  cartCount = 0
  constructor() { }

  addToCart(product: any) {
    let productExists = false
    for (let item in this.cartItem) {
      if (this.cartItem[item].productId === product.id) {
        this.cartItem[item].qty++
        productExists = true
        break
      }
    }
    if (!productExists) {
      this.cartItem.push({
        productId: product.id,
        productName: product.name,
        qty: 1,
        price: product.price
      })
    }
    this.cartTotal = 0
    this.cartItem.forEach(item=>{
      this.cartTotal += (item.price*item.qty)
    })
    this.countCart()
  }

  getCartItem() {
    return this.cartItem
  }

  clearCart(){
    this.cartItem = []
    this.countCart()
  }

  countCart() {
    let totalQty = 0
    for (let i = 0; i < this.cartItem.length; i++) {
      totalQty += this.cartItem[i].qty
    }
    this.cartCount = totalQty
    return totalQty
  }
}
*/

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItem = new BehaviorSubject<any[]>([]);
  cartTotal = 0;
  cartCount = 0;

  constructor() { }

  addToCart(product: any) {
    let productExists = false
    const currentCartItems = this.cartItem.value

    for (let item of currentCartItems) {
      if (item.productId === product.id) {
        item.qty++
        productExists = true
        break
      }
    }

    if (!productExists) {
      currentCartItems.push({
        productId: product.id,
        productName: product.name,
        qty: 1,
        price: product.price,
        imageUrl: product.imageUrl
      });
    }
    this.cartItem.next(currentCartItems)
    this.calculateTotal();
    this.countCart();
  }

  getCartItem() {
    this.calculateTotal();
    return this.cartItem.asObservable()
  }

  clearCart() {
    this.cartItem.next([])
    this.countCart();
  }

  countCart() {
    let totalQty = 0;
    this.cartItem.value.forEach(item => {
      totalQty += item.qty;
    });
    this.cartCount = totalQty;
    return totalQty
  }

  calculateTotal() {
    let total = 0;
    this.cartItem.value.forEach(item => {
      total += item.price * item.qty;
    });
    this.cartTotal = total;
  }

  removeProduct(item: any) {
    const currentCartItems = this.cartItem.value;
    const index = currentCartItems.findIndex(cartItem => cartItem.productId === item.productId);
    if (index !== -1) {
      currentCartItems.splice(index, 1);
      this.cartItem.next(currentCartItems);
      this.calculateTotal();
      this.countCart();
    }
  }
}
