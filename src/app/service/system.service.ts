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

 

}