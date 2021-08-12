import { Component, OnInit } from '@angular/core';
import { LineItem } from 'src/app/model/line-item.class';
import { Request } from 'src/app/model/request.class';

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

  constructor(
       ) { }

  ngOnInit(): void {
    // 1. get request for id passed in URL
    

    // 2. get line items for the request

  }

}