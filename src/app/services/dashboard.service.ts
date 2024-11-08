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

  getDataTurnoverChartForDashboard(period: any){
    return this.http.get(this.constantService.API_ENDPOINT + this.constantService.BILLS + `/chart-turnover-data?period=${period}`)
  }

  getTop10BestSellingProducts(){
    return this.http.get(this.constantService.API_ENDPOINT + this.constantService.BILLS + `/chart-top10-products`)
  }

  getTop10ProductByStock(){
    return this.http.get(this.constantService.API_ENDPOINT + this.constantService.PRODUCTS + `/chart-top-products-by-stock`)
  }

}
