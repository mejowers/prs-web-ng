import { Component, OnInit } from '@angular/core';
import { RequestReviewComponent } from 'src/app/feature/request/request-review/request-review.component';
import { MenuItem } from 'src/app/model/menu-item.class';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menuItems: MenuItem[] = [];
  
  loggedInUser: User = new User();
  

  constructor(
    private systemSvc: SystemService
  ) { }

  ngOnInit(): void {

    this.loggedInUser = this.systemSvc.loggedInUser;

    this.menuItems = [
      new MenuItem("User", "/user-list", "User List"),
      new MenuItem("Vendor", "/vendor-list", "Vendor List"),
      new MenuItem("Product", "/product-list", "Product List"),
      new MenuItem("Request", "/request-list", "Request List"),
      new MenuItem("Logout", "/user-login", "User Login")
    ]
    //is user reviewer?  if so, add Review menu component

    let reviewer = this.systemSvc.loggedInUser.reviewer;
    if (reviewer == true)
    this.menuItems.push(new MenuItem("Review", "/request-review", "Review"));
  }
}

  
