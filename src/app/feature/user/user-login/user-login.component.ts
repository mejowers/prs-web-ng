import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginView } from 'src/app/model/login-view.class';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  title: string = "Login";
  msg: string = '';
  user: User = new User();
  loginView: LoginView = new LoginView();

  constructor(
    private userSvc: UserService,
    private systemSvc: SystemService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginView.username = "mjowers";
    this.loginView.password = "password";
  }

  login() {
    //call login service using username and password
    this.userSvc.login(this.loginView).subscribe(
      resp => {
        if (resp == null) {
          this.msg = "Invalid username / password combo.";
        }
        else {
          this.user = resp as User;
          this.systemSvc.loggedInUser = this.user;
          this.router.navigateByUrl('/request-list');
        }
      },
      err => {
        this.msg = "Error during login"
      }
    );
  }

}
