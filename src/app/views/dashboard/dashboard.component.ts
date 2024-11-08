import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import {DashboardService} from "../../services/dashboard.service";

interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private chartsData: DashboardChartsData, private dashboardService: DashboardService) {
  }

  public users: IUser[] = [
    {
      name: 'Yiorgos Avraamu',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Us',
      usage: 50,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Mastercard',
      activity: '10 sec ago',
      avatar: './assets/img/avatars/1.jpg',
      status: 'success',
      color: 'success'
    },
    {
      name: 'Avram Tarasios',
      state: 'Recurring ',
      registered: 'Jan 1, 2021',
      country: 'Br',
      usage: 10,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Visa',
      activity: '5 minutes ago',
      avatar: './assets/img/avatars/2.jpg',
      status: 'danger',
      color: 'info'
    },
    {
      name: 'Quintin Ed',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'In',
      usage: 74,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Stripe',
      activity: '1 hour ago',
      avatar: './assets/img/avatars/3.jpg',
      status: 'warning',
      color: 'warning'
    },
    {
      name: 'Enéas Kwadwo',
      state: 'Sleep',
      registered: 'Jan 1, 2021',
      country: 'Fr',
      usage: 98,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Paypal',
      activity: 'Last month',
      avatar: './assets/img/avatars/4.jpg',
      status: 'secondary',
      color: 'danger'
    },
    {
      name: 'Agapetus Tadeáš',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Es',
      usage: 22,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'ApplePay',
      activity: 'Last week',
      avatar: './assets/img/avatars/5.jpg',
      status: 'success',
      color: 'primary'
    },
    {
      name: 'Friderik Dávid',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Pl',
      usage: 43,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Amex',
      activity: 'Yesterday',
      avatar: './assets/img/avatars/6.jpg',
      status: 'info',
      color: 'dark'
    }
  ];
  public mainChart: IChartProps = {};
  public turnoverChart: IChartProps = {};
  public chart: Array<IChartProps> = [];
  public backgroundColor: [
    '#FF6384', '#4BC0C0', '#FFCE56', '#E7E9ED', '#36A2EB',
    '#9966FF', '#FF9F40', '#FFCD56', '#4DC9F6', '#F67019'
  ]
  public chartPopularData: any
  public chartInventoryData: any

  public trafficRadioGroup = new UntypedFormGroup({
    trafficRadio: new UntypedFormControl('Day')
  });

  public saleRadioGroup = new UntypedFormGroup({
    saleRadio: new UntypedFormControl('Day')
  });

  ngOnInit(): void {
    this.initCharts();
    this.getDataForChartInventoryData();
    this.getDataForChartPopularData();
  }

  initCharts(): void {
    this.getDataForChartInventoryData();
    this.getDataForChartPopularData();
    this.mainChart = this.chartsData.mainChart;
    this.turnoverChart = this.chartsData.turnoverChart;
    /*this.setTrafficPeriod('day');*/
  }

  setTrafficPeriod(value: string): void {
    this.mainChart = this.chartsData.mainChart;
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.chartsData.initMainChartForDay(value);
    this.initCharts();
  }

  setTrafficMonth(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.chartsData.initMainChartForMonth(value);
    this.initCharts();
  }

  setTurnoverTrafficPeriod(value: string): void {
    this.turnoverChart = this.chartsData.turnoverChart;
    this.saleRadioGroup.setValue({ saleRadio: value });
    this.chartsData.turnoverMainChartForDay(value);
    this.initCharts();
  }

  setTurnoverTrafficMonth(value: string): void {
    this.saleRadioGroup.setValue({ saleRadio: value });
    this.chartsData.turnoverMainChartForMonth(value);
    this.initCharts();
  }

  /*
  initCharts(): void {
    this.mainChart = this.chartsData.mainChart;
  }

  setTrafficPeriod(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.chartsData.initMainChart(value);
    this.initCharts();
  }
  */

  getDataForChartPopularData(){
    this.dashboardService.getTop10BestSellingProducts().subscribe((res: any) => {
      this.chartPopularData = {
        labels: res.data.productNames,
        datasets: [
          {
            data: res.data.quantities,
            backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56', '#E7E9ED', '#36A2EB',
              '#9966FF', '#FF9F40', '#FFCD56', '#4DC9F6', '#F67019']
          }
        ]
      };
    })
  }

  getDataForChartInventoryData(){
    this.dashboardService.getTop10ProductByStock().subscribe((res: any) => {
      this.chartInventoryData = {
        labels: res.data.productNames,
        datasets: [
          {
            data: res.data.stockQuantities,
            backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56', '#E7E9ED', '#36A2EB',
              '#9966FF', '#FF9F40', '#FFCD56', '#4DC9F6', '#F67019']
          }
        ]
      };
    })
  }
}
