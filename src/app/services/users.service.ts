import { Injectable } from '@angular/core';
import {ConstantService} from "./constant.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private constantService: ConstantService, private http: HttpClient) {
  }

  getListByPage(page?: number, pageSize?: number){
    const params = [
      'page=' + page,
      '&size=' + pageSize
    ].join('');
    return this.http.get(this.constantService.API_ENDPOINT + this.constantService.USERS + "/list?" + params)
  }

  updateUser(id: number, data: any): Observable<any>{
    return this.http.put(this.constantService.API_ENDPOINT + this.constantService.USERS + `/update/${id}`, data)
  }

  deleteUser(id: number): Observable<any>{
    return this.http.delete(this.constantService.API_ENDPOINT + this.constantService.USERS + `/delete/${id}`)
  }
}
