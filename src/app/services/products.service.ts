import { Injectable } from '@angular/core';
import {ConstantService} from "./constant.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private constantService: ConstantService, private http: HttpClient) { }

  getListByPage(page?: number, pageSize?: number){
    const params = [
      'page=' + page,
      '&size=' + pageSize
    ].join('');
    return this.http.get(this.constantService.API_ENDPOINT + this.constantService.PRODUCTS + "/list?" + params)
  }

  addProduct(data: any): Observable<any> {
    console.log(data)
    return this.http.post(this.constantService.API_ENDPOINT + this.constantService.PRODUCTS + "/create", data)
  }

  updateProduct(id: number, data: any): Observable<any>{
    console.log(data)
    return this.http.put(this.constantService.API_ENDPOINT + this.constantService.PRODUCTS + `/update/${id}`, data)
  }

  deleteProduct(id: number): Observable<any>{
    return this.http.delete(this.constantService.API_ENDPOINT + this.constantService.PRODUCTS + `/delete/${id}`)
  }
}
