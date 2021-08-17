import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user.class';
import { Vendor } from 'src/app/model/vendor.class';
import { SystemService } from 'src/app/service/system.service';
import { VendorService } from 'src/app/service/vendor.service';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.css']
})
export class VendorDetailComponent implements OnInit {

  title: string = "Vendor-Detail";
  vendor: Vendor = new Vendor();
  vendorId: number = 0;
  loggedInUser: User = new User();

  constructor(
    private vendorSvc: VendorService,
    private router: Router,
    private route: ActivatedRoute,
    private systemSvc: SystemService
  ) { }

  ngOnInit(): void {
    this.loggedInUser = this.systemSvc.loggedInUser;
    this.systemSvc.checkLogin();
    this.route.params.subscribe(parms => this.vendorId = parms["id"]);
    this.vendorSvc.get(this.vendorId).subscribe(
      resp => { this.vendor = resp as Vendor;},
            err=> {console.log(err);}
    );
  }

  delete() {
    this.vendorSvc.delete(this.vendorId).subscribe(
      resp => {
        this.vendor = resp as Vendor;
        this.router.navigateByUrl('/vendor-list');
      },
      err => {
        console.log(err);
      }
    );
  }
}

