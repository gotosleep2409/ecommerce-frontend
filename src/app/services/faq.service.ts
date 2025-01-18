import { Injectable } from '@angular/core';
import {ConstantService} from "./constant.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(private constantService: ConstantService, private http: HttpClient) { }

  getFAQs(): Observable<any> {
    return this.http.get(this.constantService.API_ENDPOINT + this.constantService.FAQ + `/faqs`);
  }

  askQuestion(question: string): Observable<any> {
    const body = { question };
    return this.http.post(this.constantService.API_ENDPOINT + this.constantService.CHATBOT+ `/ask`, body);
  }
}
