import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantsListComponent } from './components/restaurants-list/restaurants-list.component';

const routes: Routes = [
  { path: 'restaurants-list', component: RestaurantsListComponent},
  { path: '', pathMatch: 'full', redirectTo: 'restaurants-list' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
