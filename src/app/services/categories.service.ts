import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConstantService} from "./constant.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private constantService: ConstantService, private http: HttpClient) {
  }

  getListByPage(page?: number, pageSize?: number){
    const params = [
      'page=' + page,
      '&size=' + pageSize
    ].join('');
    return this.http.get(this.constantService.API_ENDPOINT + this.constantService.CATEGORIES + "/list?" + params)
  }

  addCategory(data: any): Observable<any> {
    return this.http.post(this.constantService.API_ENDPOINT + this.constantService.CATEGORIES + "/create", data)
  }

  updateCategory(id: number, data: any): Observable<any>{
    return this.http.put(this.constantService.API_ENDPOINT + this.constantService.CATEGORIES + `/update/${id}`, data)
  }

  deleteCategory(id: number): Observable<any>{
    return this.http.delete(this.constantService.API_ENDPOINT + this.constantService.CATEGORIES + `/delete/${id}`)
  }

  getListByCategoryId(id:number, page?: number, pageSize?: number){
    const params = [
      'page=' + page,
      '&size=' + pageSize
    ].join('');
    return this.http.get(this.constantService.API_ENDPOINT + this.constantService.CATEGORIES + `/${id}?` + params)
  }
}
