import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Vendor } from 'src/app/model/vendor.class';
import { SystemService } from 'src/app/service/system.service';
import { VendorService } from 'src/app/service/vendor.service';

@Component({
  selector: 'app-vendor-edit',
  templateUrl: '../vendor-maint-shared/vendor-maint.html',
  styleUrls: ['./vendor-edit.component.css']
})
export class VendorEditComponent implements OnInit {

  title: string = "Vendor-Edit";
  vendor: Vendor = new Vendor();
  submitBtnTitle: string = "Edit";
  vendorId: number = 0;

  constructor(
    private vendorSvc: VendorService,
    private router: Router,
    private route: ActivatedRoute,
    private systemSvc: SystemService
  ) { }

  ngOnInit(): void {
    this.systemSvc.checkLogin();
    this.route.params.subscribe(parms => this.vendorId = parms["id"]);
    this.vendorSvc.get(this.vendorId).subscribe(
      resp => { this.vendor = resp as Vendor; },
      err => { console.log(err); }
    );
  }
  save() {
    this.vendorSvc.edit(this.vendor).subscribe(
      resp => {
        this.vendor = resp as Vendor;
        this.router.navigateByUrl("/vendor-list");
      },
      err => { console.log(err) }
    );
  }

}
