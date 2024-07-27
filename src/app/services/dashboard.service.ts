import {Injectable} from "@angular/core";
import {ConstantService} from "./constant.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DashboardService{
  constructor(private constantService: ConstantService, private http: HttpClient) { }

  getDataChartForDashboard(period: any){
    return this.http.get(this.constantService.API_ENDPOINT + this.constantService.BILLS + `/chart-data?period=${period}`)
  }
}
