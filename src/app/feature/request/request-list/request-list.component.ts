import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';
import { Request } from 'src/app/model/request.class';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';


@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})

export class RequestListComponent implements OnInit {

  requests: Request[] = [];
  users: User[] = [];
  title: string = "Request List";
  loggedInUser: User = new User();

  constructor(
    private requestSvc: RequestService,
    private systemSvc: SystemService
    ) { }

  ngOnInit(): void {
    this.loggedInUser = this.systemSvc.loggedInUser;
    this.systemSvc.checkLogin();
    this.requestSvc.list().subscribe(
      resp => {
        this.requests = resp as Request[];
      },
      err => {
        console.log(err);
      }
    );
  }

}