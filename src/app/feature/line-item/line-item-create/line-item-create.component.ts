import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LineItem } from 'src/app/model/line-item.class';
import { Product } from 'src/app/model/product.class';
import { Request } from 'src/app/model/request.class';
import { User } from 'src/app/model/user.class';
import { LineItemService } from 'src/app/service/line-item.service';
import { ProductService } from 'src/app/service/product.service';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-line-item-create',
  templateUrl: './line-item-create.component.html',
  styleUrls: ['./line-item-create.component.css']
})
export class LineItemCreateComponent implements OnInit {

  title: string = "Line-Item-Create";
  lineItem: LineItem = new LineItem();
  submitBtnTitle: string = "Create";
  request: Request = new Request();
  products: Product[] = [];
  requestId: number = 0;
  loggedInUser: User = new User();


  constructor(
    private lineItemSvc: LineItemService,
    private requestSvc: RequestService,
    private productSvc: ProductService,
    private router: Router,
    private systemSvc: SystemService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loggedInUser = this.systemSvc.loggedInUser;
    this.systemSvc.checkLogin();
    this.route.params.subscribe(parms => this.requestId = parms["id"]);
    this.requestSvc.get(this.requestId).subscribe(
      resp => { 
        this.lineItem.request = resp as Request;
        this.lineItem.requestId = +this.requestId;
       
       },
      err => { console.log(err); }
    );
    //populate list of products
    this.productSvc.list().subscribe(
      resp => { this.products = resp as Product[]; },
      err => { console.log(err); }
    );
  }

  save() {
    this.loggedInUser = this.systemSvc.loggedInUser;
    this.lineItem.productId = this.lineItem.product.id;
    console.log(this.lineItem);

    this.lineItemSvc.create(this.lineItem).subscribe(
      resp => {
        // let requestId = this.lineItem.request == null? this.lineItem.requestId : this.lineItem.request.id; 
        // this allows the front end to talk to both c# (which does not need the instance passed through the ed) and Java(which does 
        //need the instance passed through the edit) to work from the same front end.
        this.lineItem = resp as LineItem;
        this.router.navigateByUrl('/request-lines/'+ this.requestId);
      },
      err => { console.log(err) }
    );
  }
}
