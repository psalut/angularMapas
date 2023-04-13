import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';
import * as L from 'leaflet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.scss']
})
export class AddRestaurantComponent implements OnInit {
  restaurantForm: FormGroup;

  map: L.Map;
  
  options = {
    zoom: 15,
    maxZoom: 20,
    center: L.latLng(-32.957362, -60.521375),
    attributionControl: false,
  };

  addressResults;

  constructor(
    private restaurantsService: RestaurantsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.map = L.map('map-add', this.options).setView([-32.957817236807934, -60.650531441116954], 13);
    this.setGoogleMaps();

    const searchControl = GeoSearchControl({
      provider: new OpenStreetMapProvider(),
      style: 'bar',
    });

    this.map.addControl(searchControl);
    this.map.on('geosearch/showlocation', (result) => {
      this.addressSelected(result)
    });

    this.restaurantForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      hours: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required])
    });
  }

  addressSelected(result) {
    this.restaurantForm.controls['address'].setValue(result.location.label);
    this.restaurantForm.controls['address'].markAsTouched();
    this.restaurantForm.controls['address'].markAsDirty();
    this.restaurantForm.controls['address'].updateValueAndValidity();
  }

  setGoogleMaps() {
    const tiles = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3']
    });
    
    tiles.addTo(this.map);
  }

  cancelCreation() {
    this.router.navigate(['restaurants-list']);
  }

  onSubmit() {
    const newRestaurant = new Restaurant (
      this.restaurantsService.getNextId(),
      this.restaurantForm.get('name').value,
      this.restaurantForm.get('type').value,
      this.restaurantForm.get('address').value,
      this.restaurantForm.get('hours').value,
      this.restaurantForm.get('phoneNumber').value,
    );
    
    this.restaurantsService.createRestaurant(newRestaurant);
    this.router.navigate(['restaurants-list']);
  }

}
