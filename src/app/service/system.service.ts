import { Injectable } from '@angular/core';
import { User } from '../model/user.class';
import { Router } from '@angular/router';


const URL: string = "http://localhost:8080/api/users";

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  loggedInUser: User = new User();

  constructor(
    private router: Router
  ) { }

  isAdmin(): boolean {
    return (this.loggedInUser.id == 0 ) ? false : this.loggedInUser.admin;
  }

  isReviewer(): boolean {
    return (this.loggedInUser.id == 0) ? false : this.loggedInUser.reviewer;
  }

  checkLogin(): void {
    if (this.loggedInUser.id == 0) {
      console.log("User is not logged in... redirecting to login.");
      this.router.navigateByUrl("/user-login");
    }
  }
}


