import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapboxService } from '../../services/mapbox.service';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
      .mapa-container {
        width: 100%;
        height: 100%;
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
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;
  longitud: number = -99.16756716251211;
  latitud: number = 19.427157186323946;

  constructor() { }

  ngOnDestroy(): void {
    this.mapa.off('zoom', () => {}); // El segundo argumento es una funcion para ejecutar la limpieza
    this.mapa.off('zoomend', () => {});
    this.mapa.off('move', () => {});
  }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      // nativeElement: Es el elemento propio que necesita el container
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ this.longitud , this.latitud ],
      zoom: this.zoomLevel
    });

    this.mapa.on('zoom', ()=> {
      this.zoomLevel = this.mapa.getZoom()
    });

    this.mapa.on('zoomend', ()=> {
      if (this.mapa.getZoom() > 18) {
        this.mapa.zoomTo(18);
      }
    });

    this.mapa.on('move', (event) => {
      const target = event.target;
      const {lat, lng} = target.getCenter();
      this.longitud = lng;
      this.latitud = lat
    })
  }

  zoomIn(){
    this.mapa.zoomIn();
    this.zoomLevel = this.mapa.getZoom();
  }

  zoomOut(){
    this.mapa.zoomOut();
    this.zoomLevel = this.mapa.getZoom();
  }

  zoomCambio() {
    this.mapa.zoomTo(this.zoomLevel);
  }
}
