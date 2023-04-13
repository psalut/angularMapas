import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurant-info',
  templateUrl: './restaurant-info.component.html',
  styleUrls: ['./restaurant-info.component.scss']
})
export class RestaurantInfoComponent implements OnInit {

  restaurantSelected;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.restaurantSelected = JSON.parse(this.route.snapshot.queryParams['data']);
  }

  returnToList() {
    this.router.navigate(['restaurants-list']);
  }

}
