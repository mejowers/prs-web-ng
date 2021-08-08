import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.class';
import { HttpClient } from '@angular/common/http';


const URL: string = "http://localhost:8080/api/users";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( 
    private http: HttpClient) { }

    list(): Observable<User[]> {
      return this.http.get(URL+"/") as Observable<User[]>

    }
  }