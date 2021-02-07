import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar} from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseURL = 'http://localhost:3001/products';

  constructor(private snackBar: MatSnackBar,
              private http: HttpClient) { }

  showMessage(msg: string): void{
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition:'right',
      verticalPosition:'top'
    })
  }

  // inserir o produto no backend
  create(product: Product): Observable<Product>{
    return this.http.post<Product>(this.baseURL, product)
  }

  // ler o array de produtos
  read(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseURL)
  }
}
