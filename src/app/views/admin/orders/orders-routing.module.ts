import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {OrdersListComponent} from "./orders-list/orders-list.component";
import {OrdersDetailComponent} from "./orders-detail/orders-detail.component";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'orders'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'orders'
      },
      {
        path: 'list',
        component:OrdersListComponent,
        data: {
          title: 'list'
        }
      },
      {
        path: 'detail',
        component: OrdersDetailComponent,
        data: {
          title: 'Detail'
        }
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {
}
