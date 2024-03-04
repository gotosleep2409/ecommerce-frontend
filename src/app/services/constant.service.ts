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


  constructor() {
    this.CATEGORIES = "categories"
    this.PRODUCTS = "products"
    this.USERS = "users"
  }
}
