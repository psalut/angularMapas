import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantsListComponent } from './components/restaurants-list/restaurants-list.component';
import { RestaurantInfoComponent } from './components/restaurant-info/restaurant-info.component';
import { AddRestaurantComponent } from './components/add-restaurant/add-restaurant.component';

const routes: Routes = [
  { path: 'restaurants-list', component: RestaurantsListComponent},
  { path: 'restaurant-info', component: RestaurantInfoComponent},
  { path: 'add-restaurant', component: AddRestaurantComponent},
  { path: '', pathMatch: 'full', redirectTo: 'restaurants-list' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
