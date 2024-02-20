import { Injectable } from '@angular/core';
import {ConstantService} from "./constant.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private constantService: ConstantService, private http: HttpClient) {
  }
  login(data: any): Observable<any> {
    return this.http.post(this.constantService.API_ENDPOINT + this.constantService.USERS + "/login", data)
  }
}
