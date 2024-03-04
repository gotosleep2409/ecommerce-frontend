import {RouterModule, Routes} from "@angular/router";
import {UsersListComponent} from "./users-list/users-list.component";
import {UsersDetailComponent} from "./users-detail/users-detail.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'users'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'users'
      },
      {
        path: 'list',
        component:UsersListComponent,
        data: {
          title: 'list'
        }
      },
      {
        path: 'detail',
        component: UsersDetailComponent,
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
export class UsersRoutingModule {
}
