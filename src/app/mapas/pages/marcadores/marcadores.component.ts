import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorPersonalizado {
  color: string,
  marker: mapboxgl.Marker
};

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [ `
    .mapa-container {
        width: 100%;
        height: 100%;
      }

    .list-group {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 99;
    }

    li {
      cursor: pointer;
    }

      .row {
        position:fixed;
        background-color: white;
        z-index: 999;
        border-radius: 5px;
        bottom: 50px;
        left: 50px;
        padding: 10px;
        width: 400px
      }  
  `
  ]
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  longitud: number = -99.16756716251211;
  latitud: number = 19.427157186323946;
  markers: MarcadorPersonalizado[] = []; // Es para mostrar la ista de marcadores. Lo refactorice de mapboxgl.Marker

  constructor() { }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      // nativeElement: Es el elemento propio que necesita el container
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ this.longitud , this.latitud ],
      zoom: this.zoomLevel
    });

    
    // Obtengo la ltd, lng para asignarla al MArker
    this.mapa.on('move', (event)=> {
      const target = event.target;
      const {lat, lng} = target.getCenter();
      this.longitud = lng;
      this.latitud = lat
    });

    // this.mapa.on('click', () => {
    //   const marker = new mapboxgl.Marker()
    //     .setLngLat([this.longitud, this.latitud])
    //     .addTo(this.mapa);

    // });

  }

  agregarMArcador(){
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const marker = new mapboxgl.Marker({
      draggable: true,
      color
    })
        .setLngLat([this.longitud, this.latitud])
        .addTo(this.mapa);

    this.markers.push({
      color,
      marker
    });
    
  }

  irMarcador(marker: mapboxgl.Marker){
    const {lat, lng} = marker.getLngLat();
    
    this.mapa.flyTo({
      center: [lng, lat],
      essential: true
    })
  }

}
