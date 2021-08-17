import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/model/vendor.class';
import { SystemService } from 'src/app/service/system.service';
import { VendorService } from 'src/app/service/vendor.service';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {

  title: string = "Vendor-List";
  vendors: Vendor[] = [];

  constructor(
    private vendorSvc: VendorService,
    private systemSvc: SystemService) { }

  ngOnInit(): void {
    this.systemSvc.checkLogin();
    this.vendorSvc.list().subscribe(
      resp => {
        this.vendors = resp as Vendor[];
        console.log("list of vendors:", this.vendors);
      },
      err => {console.log(err)}
    );
  }

}
