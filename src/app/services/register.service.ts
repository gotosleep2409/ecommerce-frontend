import { Injectable } from '@angular/core';
import {ConstantService} from "./constant.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private constantService: ConstantService, private http: HttpClient) {
  }
  register(data: any): Observable<any> {
    return this.http.post(this.constantService.API_ENDPOINT + this.constantService.USERS + "/register", data)
  }

  verifyEmail(code: string): Observable<string> {
    return this.http.get<string>(this.constantService.API_ENDPOINT + this.constantService.USERS + "/verify", { params: { code } });
  }
}
