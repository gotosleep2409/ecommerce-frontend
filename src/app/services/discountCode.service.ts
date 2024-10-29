import {Injectable} from "@angular/core";
import {ConstantService} from "./constant.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DiscountCodeService {
  constructor(private constantService: ConstantService, private http: HttpClient) {
  }

  getListByPage(page?: number, pageSize?: number){
    const params = [
      'page=' + page,
      '&size=' + pageSize
    ].join('');
    return this.http.get(this.constantService.API_ENDPOINT + this.constantService.DISCOUNTCODE + "/list?" + params)
  }

  addDiscountCode(data: any): Observable<any> {
    return this.http.post(this.constantService.API_ENDPOINT + this.constantService.DISCOUNTCODE + "/create", data)
  }

  updateDiscountCode(id: number, data: any): Observable<any>{
    return this.http.put(this.constantService.API_ENDPOINT + this.constantService.DISCOUNTCODE + `/update/${id}`, data)
  }

  deleteDiscountCode(id: number): Observable<any>{
    return this.http.delete(this.constantService.API_ENDPOINT + this.constantService.DISCOUNTCODE + `/delete/${id}`)
  }

  checkDiscountCode(code: string): Observable<any> {
    return this.http.post(this.constantService.API_ENDPOINT + this.constantService.DISCOUNTCODE + "/check", { code });
  }
}
