import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, firstValueFrom, map } from 'rxjs';
import { ProductModel } from 'src/app/models/ProductModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
    @Inject('baseUrl') private baseUrl: string
  ) { }


  // Get all products
  getAllProducts(): Observable<ProductModel[]> {
    const observable: Observable<ProductModel[]> = this.http.get<ProductModel[]>(this.baseUrl);
    return observable
  }

  updateProduct(product:Partial<ProductModel>): Observable<ProductModel> {
    const observable: Observable<ProductModel> = this.http.post<ProductModel>(this.baseUrl, product, { responseType: 'json' });
    return observable
  }
}
