import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularMapas';

  constructor(
    private router: Router
  ) { }

  addRestaurant() {
    this.router.navigate(['add-restaurant']);
  }

  navigateHome() {
    this.router.navigate(['restaurants-list']);
  }
}

