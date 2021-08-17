import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product.class';
import { User } from 'src/app/model/user.class';
import { Vendor } from 'src/app/model/vendor.class';
import { ProductService } from 'src/app/service/product.service';
import { SystemService } from 'src/app/service/system.service';
import { VendorService } from 'src/app/service/vendor.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  title: string = "Product-Create";
  product: Product = new Product();
  vendors: Vendor[] = [];
  loggedInUser: User = new User();


  constructor(
    private productSvc:ProductService,
    private vendorSvc:VendorService,
    private systemSvc:SystemService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.loggedInUser = this.systemSvc.loggedInUser;
    this.systemSvc.checkLogin();
    //populate list of vendors
    this.vendorSvc.list().subscribe(
      resp => { this.vendors = resp as Vendor[];},                
                err => {console.log(err);}
    );
  }

  save() {
    this.productSvc.create(this.product).subscribe(
      resp => {
        this.product = resp as Product;
        this.router.navigateByUrl("/product-list");},
        err => {console.log(err)}
    );
  }

}