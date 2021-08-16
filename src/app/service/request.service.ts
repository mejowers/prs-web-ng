import { HttpClient } from '@angular/common/http';
import { R3QueryMetadata } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Request } from '../model/request.class';


const URL: string = "http://localhost:8080/api/requests";

@Injectable({
  providedIn: 'root'
})

export class RequestService {

  constructor(
    private http: HttpClient) { }

  list(): Observable<Request[]> {
    return this.http.get(URL + "/") as Observable<Request[]>;
  }

  get(id: number): Observable<Request> {
    return this.http.get(URL + "/" + id) as Observable<Request>;
  }

  create(request: Request): Observable<Request> {
    return this.http.post(URL + "/", request) as Observable<Request>;
  }

  edit(request: Request): Observable<Request> {
    return this.http.put(URL + "/", request) as Observable<Request>;
  }

  delete(id: number): Observable<Request> {
    return this.http.delete(URL + "/" + id) as Observable<Request>;
  }

  submit(request: Request): Observable<Request> {
    return this.http.put(URL + "/submit-review", request) as Observable<Request>;
  }
}
