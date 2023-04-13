import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  restaurants = [
    {
      id: 1,
      name: "Mostaza",
      type: "Fast food",
      add: "Av. Pellegrini 1431, S2000 BUB, Santa Fe",
      address: [-32.9566287954022, -60.64568247050882],
      hours: "Monday - Friday between 9am - 16pm",
      phoneNumber:"+54 9 3415507590"
    },
    {
      id: 2,
      name: "John coffee shop",
      type: "Coffee shop",
      add: "Dorrego 492, S2000 Rosario, Santa Fe",
      address: [-32.9408389313544, -60.64843152656649],
      hours: "Monday - Wednesday between 9am - 16pm",
      phoneNumber:"+54 9 3415507590"
    },
  ]

  constructor() { }

  getRestaurants() {
    return this.restaurants;
  }

  createRestaurant(newRestaurant) {
    this.restaurants = [...this.restaurants, newRestaurant];
  }

  getNextId() {
    return this.restaurants.length + 1;
  }
}
