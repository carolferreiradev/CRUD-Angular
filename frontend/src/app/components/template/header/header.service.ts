import { HeaderData } from './header-data.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'//unica instancia do service na aplicação
})
export class HeaderService {
  // BehaviorSubject -> emite um evento sempre que os dados são mudados
  private _headerData = new BehaviorSubject<HeaderData>({
    title: 'Início',
    icon: 'home',
    routeUrl: ''
  })
  
  constructor() { }
  // não sera criada uma nova instancia e sim alterados os dados dentro do HeaderData
  // Para isso criaremos métodos GET e SET

  get headerData(): HeaderData{
    return this._headerData.value
  }

  set headerData(headerData: HeaderData){
    this._headerData.next(headerData)
  }

}
