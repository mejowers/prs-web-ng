import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Request } from 'src/app/model/request.class';
import { User } from 'src/app/model/user.class';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {

  title: string = "Request Detail";
  request: Request = new Request();
  requestId: number = 0;
  loggedInUser: User = new User();

  constructor(
    private requestSvc: RequestService,
    private router: Router,
    private systemSvc: SystemService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loggedInUser = this.systemSvc.loggedInUser;
    this.systemSvc.checkLogin();
    this.route.params.subscribe(parms => this.requestId = parms["id"]);
    this.requestSvc.get(this.requestId).subscribe(
      resp => { this.request = resp as Request;},
            err=> {console.log(err);}
    );
  }

  delete() {
    this.requestSvc.delete(this.requestId).subscribe(
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