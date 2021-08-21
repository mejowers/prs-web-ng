import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.class';
import { User } from 'src/app/model/user.class';
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
  loggedInUser: User = new User();
  // default sort column to id (assumes table has an id field)
  sortCriteria: string = 'id';
  // default sort criteria of ascending
  sortOrder: string = 'asc';


  constructor(
    private productSvc: ProductService,
    private systemSvc: SystemService
  ) { }

  ngOnInit(): void {
    this.loggedInUser = this.systemSvc.loggedInUser;
    this.systemSvc.checkLogin();
    this.productSvc.list().subscribe(
      resp => {
        this.products = resp as Product[];
      },
      err => {
        console.log(err);
      }
    );
  }
  sortBy(column: string): void {
    if (column == this.sortCriteria) {
      this.sortOrder = (this.sortOrder == "desc") ? "asc" : "desc";
    }
    this.sortCriteria = column;
  }
}
