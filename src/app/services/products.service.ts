import { Injectable } from '@angular/core';
import {ConstantService} from "./constant.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private constantService: ConstantService, private http: HttpClient) { }

  getListByPage(page?: number, pageSize?: number, categoryId? : any){
    if(categoryId){
      const params = [
        'page=' + page,
        '&size=' + pageSize,
        '&categoryId=' + categoryId
      ].join('')
      return this.http.get(this.constantService.API_ENDPOINT + this.constantService.PRODUCTS + "/list?" + params)
    }
    else {
      const params = [
        'page=' + page,
        '&size=' + pageSize
      ].join('')
      return this.http.get(this.constantService.API_ENDPOINT + this.constantService.PRODUCTS + "/list?" + params)
    }
  }

  addProduct(data: any): Observable<any> {
    const formattedData = {
      name: data.name,
      description: data.description,
      creator : data.creator,
      detail: data.detail,
      imageUrl: data.imageUrl,
      price:data.price,
      priceSale: data.priceSale,
      categories: data.categories,
      sizeQuantityMap: data.sizeQuantityMap.reduce((acc: any, curr: any) => {
        acc[curr.size] = curr.quantity
        return acc
      }, {})
    }

    return this.http.post(this.constantService.API_ENDPOINT + this.constantService.PRODUCTS + "/create", formattedData)
  }

  updateProduct(id: number, data: any): Observable<any>{
    const formattedData = {
      name: data.name,
      description: data.description,
      creator : data.creator,
      detail: data.detail,
      imageUrl: data.imageUrl,
      price:data.price,
      priceSale: data.priceSale,
      categories: data.categories,
      sizeQuantityMap: data.sizeQuantityMap.reduce((acc: any, curr: any) => {
        acc[curr.size] = curr.quantity
        return acc
      }, {})
    }

    return this.http.put(this.constantService.API_ENDPOINT + this.constantService.PRODUCTS + `/update/${id}`, formattedData)
  }

  deleteProduct(id: number): Observable<any>{
    return this.http.delete(this.constantService.API_ENDPOINT + this.constantService.PRODUCTS + `/delete/${id}`)
  }

  getProduct(id: number): Observable<any>{
    return this.http.get(this.constantService.API_ENDPOINT + this.constantService.PRODUCTS +`/${id}`)
  }
}
