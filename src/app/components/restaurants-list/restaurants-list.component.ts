import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.scss']
})
export class RestaurantsListComponent implements OnInit {
  map: L.Map;
  options = { 
    zoom: 12,
    maxZoom: 20,
    center: L.latLng(51.505, -0.09),
    attributionControl: false,
  };

  constructor() { }

  ngOnInit(): void {
    this.map = L.map('map', this.options);
    // this.map.invalidateSize()
    const tiles = L.tileLayer("http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",
    {
      maxNativeZoom: 17,
      maxZoom: 20,
      minZoom: 3,
      subdomains:['mt0','mt1','mt2','mt3']
    });
    tiles.addTo(this.map);
  }

}
