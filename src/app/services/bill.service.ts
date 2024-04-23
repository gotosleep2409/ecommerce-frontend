import {Injectable} from "@angular/core";
import {ConstantService} from "./constant.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BillService{
  constructor(private constantService: ConstantService, private http: HttpClient) {
  }

  createBill(data){
    return this.http.post(this.constantService.API_ENDPOINT + this.constantService.BILLS + "/create", data)
  }

  vnPay(data){
    return this.http.post(this.constantService.API_ENDPOINT + this.constantService.BILLS + "/vnpay", data)
  }
}
