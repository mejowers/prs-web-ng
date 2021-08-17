import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LineItem } from 'src/app/model/line-item.class';
import { Product } from 'src/app/model/product.class';
import { Request } from 'src/app/model/request.class';
import { User } from 'src/app/model/user.class';
import { Vendor } from 'src/app/model/vendor.class';
import { LineItemService } from 'src/app/service/line-item.service';
import { ProductService } from 'src/app/service/product.service';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';
import { VendorService } from 'src/app/service/vendor.service';

@Component({
  selector: 'app-line-item-edit',
  templateUrl: './line-item-edit.component.html',
  styleUrls: ['./line-item-edit.component.css']
})
export class LineItemEditComponent implements OnInit {

  title: string = "Line-Item-Edit";
  lineItem: LineItem = new LineItem();
  submitBtnTitle: string = "Edit";
  request: Request = new Request();
  vendors: Vendor[] = [];
  products: Product[] = [];
  requestId: number = 0;
  lineItemId: number = 0;
  loggedInUser: User = new User();
  
  constructor(
    private lineItemSvc: LineItemService,
    private requestSvc: RequestService,
    private productSvc: ProductService,
    private vendorSvc: VendorService,
    private router: Router,
    private systemSvc: SystemService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loggedInUser = this.systemSvc.loggedInUser;
    this.systemSvc.checkLogin();
    this.route.params.subscribe(parms => this.lineItemId = parms["id"]);
    console.log('line item edit, id = ' + this.lineItemId);
    this.lineItemSvc.get(this.lineItemId).subscribe(
      resp => {
        this.lineItem = resp as LineItem;
        console.log("Line Item edit, request for LI:", this.lineItem);
      },
      err => { console.log(err); }
    );

    //populate list of products
    this.productSvc.list().subscribe(
      resp => { this.products = resp as Product[]; },
      err => { console.log(err); }
    );

    // populat a list of vendors
    this.vendorSvc.list().subscribe(
      resp => { this.vendors = resp as Vendor[]; },
      err => { console.log(err); }
    );
  }

  save() {
    console.log("edit line item:", this.lineItem);
    this.lineItemSvc.edit(this.lineItem).subscribe(
      resp => {
        this.lineItem = resp as LineItem;
        this.router.navigateByUrl('/request-lines/' + this.lineItem.request.id);
      },
      err => { console.log(err) }
    );
  }
  compProduct(a: Product, b: Product): boolean {
    return a && b && a.id === b.id;
  }
}