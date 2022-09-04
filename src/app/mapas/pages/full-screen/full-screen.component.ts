import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapboxService } from '../../services/mapbox.service';

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [
    `
      #mapa {
        width: 100%;
        height: 100%;
      }
    `
  ]
})
export class FullScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var map = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ -99.16756716251211 , 19.427157186323946 ],
      zoom: 16
    });
  }
}
