import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.class';
import { Vendor } from 'src/app/model/vendor.class';
import { SystemService } from 'src/app/service/system.service';
import { VendorService } from 'src/app/service/vendor.service';

@Component({
  selector: 'app-vendor-create',
  templateUrl: '../vendor-maint-shared/vendor-maint.html',
  styleUrls: ['./vendor-create.component.css']
})
export class VendorCreateComponent implements OnInit {

  title: string = "Vendor Create";
  vendor: Vendor = new Vendor();
  submitBtnTitle: string = "Create";
  loggedInUser: User = new User();

  constructor(
    private vendorSvc:VendorService,
    private router:Router,
    private systemSvc:SystemService
    ) { }

  ngOnInit(): void {
    this.loggedInUser = this.systemSvc.loggedInUser;
    this.systemSvc.checkLogin();
  }

  save() {
    this.vendorSvc.create(this.vendor).subscribe(
      resp => {
        this.vendor = resp as Vendor;
        this.router.navigateByUrl("/vendor-list");},
        err => {console.log(err)}
    );
  }
}
