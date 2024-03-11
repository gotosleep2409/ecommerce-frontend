import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItem = new BehaviorSubject<any[]>([])
  cartTotal = 0
  cartCount = 0

  constructor() { }

  addToCart(product: any, size?: string, quantity?: number) {
    const currentCartItems = this.cartItem.value

    const existingProductIndex = currentCartItems.findIndex(item => item.productId === product.id)

    if (existingProductIndex !== -1) {
      const existingProduct = currentCartItems[existingProductIndex]
      const existingSizeIndex = existingProduct.sizes.findIndex(item => item.size === size)

      if (existingSizeIndex !== -1) {
        existingProduct.sizes[existingSizeIndex].quantity += quantity
      } else {
        existingProduct.sizes.push({ size: size, quantity: quantity })
      }
      existingProduct.quantity = existingProduct.sizes.reduce((total, size) => total + size.quantity, 0);
    } else {
      const newProduct = {
        productId: product.id,
        productName: product.name,
        sizes: [{ size: size, quantity: quantity }],
        price: product.price,
        imageUrl: product.imageUrl,
        quantity : quantity
      }
      currentCartItems.push(newProduct)
    }
    this.cartItem.next(currentCartItems)
    this.removeItemsWithZeroQuantity()
    this.calculateTotal()
  }


  getCartItem() {
    this.countCart()
    this.removeItemsWithZeroQuantity()
    this.calculateTotal()
    return this.cartItem.asObservable()
  }

  clearCart() {
    this.cartItem.next([])
    this.countCart()
  }

  countCart() {
    let totalQty = 0
    this.cartItem.value.forEach(item => {
      totalQty += item.quantity
    })
    this.cartCount = totalQty
    return totalQty
  }

  calculateTotal() {
    let total = 0
    let totalQuantity = 0

    this.cartItem.value.forEach(item => {
      item.sizes.forEach(size => {
        totalQuantity += size.quantity
      })
      total += item.price * totalQuantity
      totalQuantity = 0
    })
    this.removeItemsWithZeroQuantity()
    this.cartTotal = total
    this.cartCount = totalQuantity
  }

  removeProduct(item: any) {
    const currentCartItems = this.cartItem.value
    const index = currentCartItems.findIndex(cartItem => cartItem.productId === item.productId)
    if (index !== -1) {
      currentCartItems.splice(index, 1)
      this.cartItem.next(currentCartItems)
      this.calculateTotal()
      this.countCart()
    }
  }

  removeItemsWithZeroQuantity() {
    const updatedCartItems = this.cartItem.value.filter(item => {
      const hasNonZeroQuantity = item.sizes.some(size => size.quantity > 0);
      return hasNonZeroQuantity && item.quantity > 0;
    });

    this.cartItem.next(updatedCartItems);
  }
}
