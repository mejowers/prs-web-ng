import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.class';
import { Vendor } from 'src/app/model/vendor.class';
import { SystemService } from 'src/app/service/system.service';
import { UserService } from 'src/app/service/user.service';
import { VendorService } from 'src/app/service/vendor.service';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {

  title: string = "Vendor List";
  vendors: Vendor[] = [];
  loggedInUser: User = new User();
  // default sort column to id (assumes table has an id field)
  sortCriteria: string = 'id';
  // default sort criteria of ascending
  sortOrder: string = 'asc';

  constructor(
    private vendorSvc: VendorService,
    private systemSvc: SystemService,
    private userSvc: UserService
  ) { }

  ngOnInit(): void {
    this.loggedInUser = this.systemSvc.loggedInUser;
    this.systemSvc.checkLogin();
    this.vendorSvc.list().subscribe(
      resp => {
        this.vendors = resp as Vendor[];
      },
      err => { console.log(err) }
    );
  }
  sortBy(column: string): void {
    if (column == this.sortCriteria) {
      this.sortOrder = (this.sortOrder == "desc") ? "asc" : "desc";
    }
    this.sortCriteria = column;
  }
}


