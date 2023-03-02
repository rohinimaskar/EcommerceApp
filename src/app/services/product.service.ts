import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService  {

  productsList: Product[] = [];
  displayProductsList: Product[] = [];

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(): Observable<string> {
    return this.http.get('/assets/test.txt', { responseType: 'text'});
  }
}
