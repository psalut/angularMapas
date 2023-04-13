import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

// Simulates an API
export class RestaurantsService {

  restaurants = [
    {
      id: 1,
      name: "Mostaza",
      type: "Fast food",
      address: "1431, Avenida Carlos Pellegrini, Paseo Pellegrini, Abasto, Distrito Centro, Rosario, Municipio de Rosario, Gran Rosario, Departamento Rosario, Santa Fe, S2000, Argentina",
      hours: "Monday - Friday between 9am - 16pm",
      phoneNumber:"+54 9 3415507590"
    },
    {
      id: 2,
      name: "John coffee shop",
      type: "Coffee shop",
      address: "492, Manuel Dorrego, Rosario Centro, Distrito Centro, Rosario, Municipio de Rosario, Gran Rosario, Departamento Rosario, Santa Fe, S2000, Argentina",
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
