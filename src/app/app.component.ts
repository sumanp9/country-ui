import { Component, OnInit } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from './service/api.service';
import { CityInterface, CountryInterface } from './country-interface';
import { CountryDetailDialogComponent } from './country-detail-dialog/country-detail-dialog.component';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myApp';
  listOfCountries: CountryInterface[] = [];
  capitalCity: CityInterface[] = [];
  capital:string= "";
  panelClicked: { [countryName: string]: boolean } = {};

  constructor(private apiService: ApiService, private dialog: MatDialog) { }

  ngOnInit(): void{
    this.apiService.getAllCountries().subscribe(data => {
      this.listOfCountries = data;
    })
  }

  onCapital(country:string): void {
    console.log(country);
    this.panelClicked[country] = !this.panelClicked[country];

    this.apiService.getCapitalCity(country).subscribe(result => {
      this.capitalCity = result;
    })
   
  }

  openDialog(country: string): void {

    console.log("County:"+ country);

    this.apiService.getCapitalCity(country).subscribe(result => {
      this.capitalCity = result;
      console.log(this.capitalCity[0].capital_city)
      this.dialog.open(CountryDetailDialogComponent, {
        data: {country: country, capital_city: this.capitalCity[0].capital_city}
      })
    })
    
  }
}
