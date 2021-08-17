import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';
import { Request } from 'src/app/model/request.class';
import { LineItem } from 'src/app/model/line-item.class';
import { LineItemService } from 'src/app/service/line-item.service';

@Component({
  selector: 'app-request-approve',
  templateUrl: './request-approve.component.html',
  styleUrls: ['./request-approve.component.css']
})
export class RequestApproveComponent implements OnInit {

  title: string = "Purchase Request Approve/Reject";
  title2: string = "Line Items";
  request: Request = new Request();
  lineItems: LineItem[] = [];
  userId: number = 0;
  requestId: number = 0;

  constructor(
    private requestSvc: RequestService,
    private router: Router,
    private route: ActivatedRoute,
    private systemSvc: SystemService,
    private lineItemSvc: LineItemService
  ) { }

  ngOnInit(): void {
    this.systemSvc.checkLogin();
    this.route.params.subscribe(parms => this.requestId = parms["id"]);
    this.requestSvc.get(this.requestId).subscribe(
      resp => { this.request = resp as Request;},
            err=> {console.log(err);}
    );
 
  this.route.params.subscribe(parms => this.requestId = parms["id"]);
  this.lineItemSvc.getLinesForRequest(this.requestId).subscribe(
    resp => { this.lineItems = resp as LineItem[];},
          err=> {console.log(err);}
  );

}

  approve() {
    this.requestSvc.approve(this.request).subscribe(
      resp => {
        this.request = resp as Request;
        this.router.navigateByUrl('/request-list');
      },
      err => {
        console.log(err);
      }
    );
  } 

  reject() {
    this.requestSvc.reject(this.request).subscribe(
      resp => {
        this.request = resp as Request;
        this.router.navigateByUrl('/request-list');
      },
      err => {
        console.log(err);
      }
    );
  } 
 

}
