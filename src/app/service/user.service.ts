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

    get(id: number): Observable<User> {
      return this.http.get(URL+'/'+id) as Observable<User>;
    } 
    
    create(user: User): Observable<User> {
      return this.http.post(URL+"/", user) as Observable<User>;
    }
  
    edit(user: User): Observable<User> {
      return this.http.put(URL+"/", user) as Observable<User>;
    }
    
    delete(id: number): Observable<User> {
      return this.http.delete(URL+'/'+id) as Observable<User>;
    } 
  }