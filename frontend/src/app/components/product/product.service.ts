import { catchError, map } from 'rxjs/operators';
import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseURL = 'http://localhost:3001/products';

  constructor(private snackBar: MatSnackBar,
    private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  // inserir o produto no backend
  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseURL, product).pipe(
      map((objeto) => objeto),
      catchError((erro) => this.errorHandler(erro))
    )
  }

  // ler o array de produtos
  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseURL).pipe(
      map((objeto) => objeto), //retorna o objeto
      catchError((erro) => this.errorHandler(erro))
    )
  }

  readeById(id: number): Observable<Product> {
    const URL = `${this.baseURL}/${id}`;
    return this.http.get<Product>(URL).pipe(
      map((objeto) => objeto),
      catchError((erro) => this.errorHandler(erro))
    )
  }

  update(product: Product): Observable<Product> {
    const URL = `${this.baseURL}/${product.id}`
    return this.http.put<Product>(URL, product).pipe(
      map((objeto) => objeto),
      catchError((erro) => this.errorHandler(erro))
    );
  }

  delete(id: number): Observable<Product> {
    const URL = `${this.baseURL}/${id}`
    return this.http.delete<Product>(URL).pipe(
      map((objeto) => objeto),
      catchError((erro) => this.errorHandler(erro))
    )
  }

  errorHandler(erro: any): Observable<any>{
    console.log(erro.name)
    if(erro.name == 'HttpErrorResponse'){
      this.showMessage(`Erro ao realizar a solicitação: SERVIDOR OFFLINE`, true)
    }else{
      this.showMessage(`Ocorreu um erro ao tentar realizar a operação: ERRO: ${erro}`, true)
    }
    return EMPTY;
  }
}
