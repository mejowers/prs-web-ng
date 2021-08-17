import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/product.class';
import { Vendor } from 'src/app/model/vendor.class';
import { ProductService } from 'src/app/service/product.service';
import { SystemService } from 'src/app/service/system.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  title: string = "Product-Detail";
  product: Product = new Product();
  vendor: Vendor[] = [];
  productId: number = 0;

  constructor(
    private productSvc: ProductService,
    private router: Router,
    private systemSvc: SystemService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.systemSvc.checkLogin();
    this.route.params.subscribe(parms => this.productId = parms["id"]);
    this.productSvc.get(this.productId).subscribe(
      resp => { this.product = resp as Product;},
            err=> {console.log(err);}
    );
  }

  delete() {
    this.productSvc.delete(this.productId).subscribe(
      resp => {
        this.product = resp as Product;
        this.router.navigateByUrl('/product-list');
      },
      err => {
        console.log(err);
      }
    );
  }

}