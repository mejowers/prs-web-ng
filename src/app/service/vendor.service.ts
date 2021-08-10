import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vendor } from '../model/vendor.class';

const URL: string = "http://localhost:8080/api/vendors";

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor( 
    private http: HttpClient) { }

    list(): Observable<Vendor[]> {
      return this.http.get(URL+"/") as Observable<Vendor[]>
    }

    get(id: number): Observable<Vendor> {
      return this.http.get(URL+'/'+id) as Observable<Vendor>;
    } 
    
    create(vendor: Vendor): Observable<Vendor> {
      return this.http.post(URL+"/", vendor) as Observable<Vendor>;
    }
  
    edit(vendor: Vendor): Observable<Vendor> {
      return this.http.put(URL+"/", vendor) as Observable<Vendor>;
    }
    
    delete(id: number): Observable<Vendor> {
      return this.http.delete(URL+'/'+id) as Observable<Vendor>;
    } 
  }