import { Component, OnInit } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from './service/api.service';
import { CityInterface, CountryInterface } from './country-interface';
import { CountryDetailDialogComponent } from './country-detail-dialog/country-detail-dialog.component';
import { map } from 'rxjs';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';

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
    this.retrieveData();
  }

  retrieveData(): void{
    this.apiService.getAllCountries().subscribe(data => {
      this.listOfCountries = data;
    })
  }
  

  onCapital(country:string): void {

    console.log('Country: '+ country)
    this.panelClicked[country] = !this.panelClicked[country];

    this.apiService.getCapitalCity(country).subscribe(result => {
      this.capitalCity = result;
    })
   
  }

  openUpdateDialog(): void{
    console.log("update clicked");
      const dialogRef = this.dialog.open(UpdateDialogComponent, {
      data: {country_name: "", capital: ""}

    });
    dialogRef.afterClosed().subscribe(result => {
      this.retrieveData();
    })
  }
}
