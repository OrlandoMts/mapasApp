import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapboxService {

  constructor() { }

  mapDefault() {
    // mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';
      // (mapboxgl as any).accessToken = environment.MAPTOKEN;
      var map = new mapboxgl.Map({
        container: 'mapa',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [ -99.16756716251211 , 19.427157186323946 ],
        zoom: 16
      });
  }


}
