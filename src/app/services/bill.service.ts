import {Injectable} from "@angular/core";
import {ConstantService} from "./constant.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BillService {
  constructor(private constantService: ConstantService, private http: HttpClient) {
  }

  createBill(data) {
    return this.http.post(this.constantService.API_ENDPOINT + this.constantService.BILLS + "/create", data)
  }

  vnPay(data) {
    return this.http.post(this.constantService.API_ENDPOINT + this.constantService.BILLS + "/vnpay", data)
  }

  getOrderList(page?: number, pageSize?: number, paymentMethod?: any, paymentStatus?: any, status?: any) {
    const params = [
      'page=' + page,
      '&size=' + pageSize,
      '&paymentMethod=' + paymentMethod,
      '&paymentStatus=' + paymentStatus,
      '&status=' + status
    ].join('')
    return this.http.get(this.constantService.API_ENDPOINT + this.constantService.BILLS + "/list?" + params)
  }

  getBillDetailByBillId(id: number) {
    return this.http.get(this.constantService.API_ENDPOINT + this.constantService.BILLS + `/${id}`)
  }

  deleteBill(id: any) {
    return this.http.delete(this.constantService.API_ENDPOINT + this.constantService.BILLS + `/delete/${id}`)
  }

  updateBill(data: any, id: any): Observable<any> {
    return this.http.put(this.constantService.API_ENDPOINT + this.constantService.BILLS + `/update/${id}` , data)
  }

  getBillDetailByUserId(id: number) {
    return this.http.get(this.constantService.API_ENDPOINT + this.constantService.BILLS + `/billByUserId/${id}`)
  }

  createReview(data: any){
    return this.http.post(this.constantService.API_ENDPOINT + this.constantService.REVIEW + '/create', data)
  }
}
