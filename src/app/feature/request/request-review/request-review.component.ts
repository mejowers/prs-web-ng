import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/model/request.class'
import { User } from 'src/app/model/user.class';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-request-review',
  templateUrl: './request-review.component.html',
  styleUrls: ['./request-review.component.css']
})
export class RequestReviewComponent implements OnInit {

  requests: Request[] = [];
  title: string = "Request Review";
  user = new User;
  userId: number = 0;
  loggedInUser: User = new User();

  constructor(
    private requestSvc: RequestService,
    private systemSvc: SystemService
  ) { }

  ngOnInit(): void {
    this.loggedInUser = this.systemSvc.loggedInUser;
    this.systemSvc.checkLogin();
    this.requestSvc.reviewList(this.systemSvc.loggedInUser.id).subscribe(
      resp => {
        this.requests = resp as Request[];
      },
      err => {
        console.log(err);
      }
    );
  }

}