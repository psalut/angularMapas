import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

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

  showDistances = false;
  restaurants;
  restaurantsBounds;
  polylines;

  constructor(
    private router: Router,
    private restaurantsService: RestaurantsService
  ) { }

  ngOnInit(): void {
    this.restaurants = this.restaurantsService.getRestaurants();
    this.map = L.map('map', this.options).setView([-32.957817236807934, -60.650531441116954], 14);
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
    const provider = new OpenStreetMapProvider();
    let markersBounds = new L.FeatureGroup();

    // Created a promise to wait the async calls (geoCoder) to finish
    var prom = new Promise((resolve, reject) => {
      this.restaurants.forEach((restaurantElement, index) => {
      
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
  
        const popupInfo = `<div><h1>`+ restaurantElement.name +`</h1><p><b>Address:</b> `+ (restaurantElement.address).slice(0, 50) +`...</p></h1><br><p><b>Type:</b> `+ restaurantElement.type +`</p><button class="view-more">View more</button></div>`
  
        let lat;
        let lng;
  
        // Get lat and lng from the address of the restaurant
        provider.search({ query: restaurantElement.address }).then((result:any) => {
          lat = result[0].y;
          lng = result[0].x;
  
          const marker = L.marker([lat, lng], {icon: icon}).addTo(this.map).bindPopup(popupInfo, {className: "customPopup", offset: [0,50]})
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
          if (index === this.restaurants.length -1) resolve(true);

        });
      });
    });
    
    prom.then(() => {
      this.map.fitBounds(markersBounds.getBounds(), {maxZoom: 15});
      this.restaurantsBounds = markersBounds;
    });
  }

  restaurantInfo(restaurantSelected) {
    this.router.navigate(['restaurant-info'], { queryParams: { data: JSON.stringify(restaurantSelected) }});
  }

  calculateDistances() {
    this.showDistances = true;
    this.polylines = L.featureGroup().addTo(this.map);

    let latLngArrays = [];
    let index = 0;
    this.restaurantsBounds.eachLayer((layer) => {
      let latlng = layer.getLatLng();
      latLngArrays = [...latLngArrays, latlng];

      if (index > 0) {
        let _length = (this.map.distance(latLngArrays[index-1], latLngArrays[index])).toString().slice(0,10);
        var polyline = L.polyline(latLngArrays, {color: 'blue'}).addTo(this.polylines);
        polyline.bindTooltip("Distance: "+(_length)+' meters', {permanent: true, offset: [0, 0]});
      }
      index++;
    });

  }

  removePolylines() {
    this.showDistances = false;
    this.polylines.eachLayer((layer) => {
      if (layer instanceof L.Polyline) {
        this.polylines.removeLayer(layer);
      }
    });
  }
}
