import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { RestaurantsService } from 'src/app/services/restaurants.service';

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.scss']
})
export class RestaurantsListComponent implements OnInit {
  map: L.Map;
  options = {
    zoom: 15,
    maxZoom: 20,
    center: L.latLng(-32.957362, -60.521375),
    attributionControl: false,
  };

  restaurants;

  constructor(
    private router: Router,
    private restaurantsService: RestaurantsService
  ) { }

  ngOnInit(): void {
    this.restaurants = this.restaurantsService.getRestaurants();
    this.map = L.map('map', this.options);
    this.setGoogleMaps();
    this.createMarkers();
  }

  setGoogleMaps() {
    const tiles = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3']
    });
    
    tiles.addTo(this.map);
  }

  createMarkers() {
    let markersBounds = new L.FeatureGroup();

    this.restaurants.forEach(restaurantElement => {
      
      let icon;
      if (restaurantElement.type === "Coffee shop") {
        icon = L.icon({
          iconUrl: '../../../assets/markers/coffee.png',
          iconSize:     [50, 50],
          iconAnchor:   [25, 25],
          popupAnchor:  [-3, -76]
        });
      } else {
        icon = L.icon({
          iconUrl: '../../../assets/markers/burguer.png',
          iconSize:     [50, 50],
          iconAnchor:   [25, 25],
          popupAnchor:  [-3, -76]
        });
      }

      const popupInfo = `<div><h1>`+ restaurantElement.name +`</h1><p><b>Address:</b> `+ restaurantElement.add +`</p></h1><br><p><b>Type:</b> `+ restaurantElement.type +`</p><button class="view-more">View more</button></div>`

      const marker = L.marker([restaurantElement.address[0], restaurantElement.address[1]], {icon: icon}).addTo(this.map).bindPopup(popupInfo, {className: "customPopup", offset: [0,50]})
        .on("popupopen", (a) => {

          var popUp = a.target.getPopup()

          popUp.getElement()
            .querySelector(".view-more")
            .addEventListener("click", e => {
              this.restaurantInfo(restaurantElement);
            });
        });

      markersBounds.addLayer(marker);
      markersBounds.addTo(this.map);
    });

    this.map.fitBounds(markersBounds.getBounds(), {maxZoom: 15});
  }

  restaurantInfo(restaurantSelected) {
    this.router.navigate(['restaurant-info'], { queryParams: { data: JSON.stringify(restaurantSelected) }});
  }
}
