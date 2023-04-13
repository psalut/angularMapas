import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestaurantsListComponent } from './components/restaurants-list/restaurants-list.component';
import { RestaurantInfoComponent } from './components/restaurant-info/restaurant-info.component';
import { AddRestaurantComponent } from './components/add-restaurant/add-restaurant.component';
@NgModule({
  declarations: [
    AppComponent,
    RestaurantsListComponent,
    RestaurantInfoComponent,
    AddRestaurantComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
