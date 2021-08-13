import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LineItem } from 'src/app/model/line-item.class';
import { Request } from 'src/app/model/request.class';
import { LineItemService } from 'src/app/service/line-item.service';
import { RequestService } from 'src/app/service/request.service';

@Component({
  selector: 'app-request-lines',
  templateUrl: './request-lines.component.html',
  styleUrls: ['./request-lines.component.css']
})
export class RequestLinesComponent implements OnInit {

  title: string = "Purchase Request Line Items";
  requestId: number = 0;
  request: Request = new Request();
  lineItems: LineItem[] = [];
  title2: string = "Line Items";
  

  constructor(
    private requestSvc: RequestService,
    private lineItemSvc: LineItemService,
    private router: Router,
    private route: ActivatedRoute
       ) { }

  ngOnInit(): void {
    // 1. get request for id passed in URL
    this.route.params.subscribe(parms => this.requestId = parms["id"]);
    this.requestSvc.get(this.requestId).subscribe(
      resp => { this.request = resp as Request;},
            err=> {console.log(err);}
    );

    // 2. get line items for the request
    this.route.params.subscribe(parms => this.requestId = parms["id"]);
    this.lineItemSvc.getLinesForRequest(this.requestId).subscribe(
      resp => { this.lineItems = resp as LineItem[];},
            err=> {console.log(err);}
    );

  }
  
  save() {
    console.log("Save request lines:",this.request);
    this.requestSvc.create(this.request).subscribe(
      resp => {
        this.request = resp as Request;
        this.router.navigateByUrl('/request-list');
      },
      err => { console.log(err) }
    );
  }
}
