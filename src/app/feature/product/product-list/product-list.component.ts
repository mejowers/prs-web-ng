import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  title: string = "Product List";
  

  constructor(
    private productSvc: ProductService,
    private systemSvc: SystemService
    ) { }

  ngOnInit(): void {
    this.systemSvc.checkLogin();
    this.productSvc.list().subscribe(
      resp => {
        this.products = resp as Product[];
              console.log("list of products:", this.products);
            },
              err => {console.log(err);
              }
    );
  }
}
