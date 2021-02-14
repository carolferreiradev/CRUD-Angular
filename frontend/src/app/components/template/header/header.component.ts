import { HeaderService } from './header.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // Injetar o service criado
  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {
  }

  // PEGANDO OS DADOS A PARTIR DO SERVICE PARA O COMPONENTE
  // obs são recursos do proprio Javascript
  get title(): string{
    return this.headerService.headerData.title
  }

  get icon(): string{
    return this.headerService.headerData.icon
  }

  get url(): string{
    return this.headerService.headerData.routeUrl
  }

}
