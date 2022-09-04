import { Component, OnInit } from '@angular/core';

interface MenuItem {
  ruta: string;
  nombre: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
    `
      div {
        position: fixed;
        top: 20px;
        left: 20px;
        z-index: 9999;
      }
      li {
        cursor: pointer;
      }
    `
  ]
})
export class MenuComponent implements OnInit {

  menuOptions: MenuItem[] = [
    {ruta: '/mapas/fullscreen', nombre: 'Pantalla completa'},
    {ruta: '/mapas/zoom-range', nombre: 'Zoom'},
    {ruta: '/mapas/marcadores', nombre: 'Marcadores'},
    {ruta: '/mapas/propiedades', nombre: 'Propiedades'},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
