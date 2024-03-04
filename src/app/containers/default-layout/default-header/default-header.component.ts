import {Component, Input, OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit{

  @Input() sidebarId: string = "sidebar";
  userName: string = ''
  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(private classToggler: ClassToggleService, private router: Router, private cookieService: CookieService) {
    super();
  }
  ngOnInit() {
    const userInfoString = sessionStorage.getItem('user_info')
    if(userInfoString!= null){
      const userInfo = JSON.parse(userInfoString)
      this.userName = userInfo.user.name
    }
  }

  onLogout() {
    this.cookieService.delete("access_token")
    this.router.navigate(['/login']);
    sessionStorage.clear()
  }
}
