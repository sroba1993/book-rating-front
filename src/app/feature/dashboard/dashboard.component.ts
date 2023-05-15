import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  constructor(
    private appComponent: AppComponent
  ) {}

  ngOnInit() {
    this.appComponent.isLoginPage = false;
  }

}
