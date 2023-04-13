import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantsService } from 'src/app/services/restaurants.service';


@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.scss']
})
export class AddRestaurantComponent implements OnInit {
  restaurantForm: FormGroup;

  constructor(
    private restaurantsService: RestaurantsService
  ) { }

  ngOnInit(): void {
    this.restaurantForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      hours: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required])
    });
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
  }

}
