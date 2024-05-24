import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ConstantService {
  API_ENDPOINT: string = environment.API_ENDPOINT
  CATEGORIES : string
  PRODUCTS: string
  USERS: string
  BILLS: string
  REVIEW: string


  constructor() {
    this.CATEGORIES = "categories"
    this.PRODUCTS = "products"
    this.USERS = "users"
    this.BILLS = "bills"
    this.REVIEW = "comments"
  }
}
