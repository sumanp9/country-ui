import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from './service/api.service';
import { CountryInterface, Cities } from './country-interface';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myApp';
  listOfCountries: CountryInterface[] = [];
  capitalCity: string ='';
  panelClicked: { [id: number]: boolean } = {};
  listOfCities: Cities[] =[];

  constructor(private apiService: ApiService, private dialog: MatDialog) { 
  } 

  ngOnInit(): void{
    this.retrieveData();
  }

  retrieveData(): void{
    this.apiService.getAllCountries().subscribe(data => {
      this.listOfCountries = data;

      console.log(data);
    })
  }
  
   getCapitalCity(id: number) {


    this.panelClicked[id] = !this.panelClicked[id];

    this.apiService.getCapitalCity(id).subscribe(result => {
      
      this.capitalCity = result.capital_city;
      console.log(this.capitalCity)
       });

    this.getAllCities(id)
         
  }

  getAllCities(country_id: number) {
    this.panelClicked[country_id] = !this.panelClicked[country_id];
    this.apiService.getAllCitiesOfCountry(country_id).subscribe(result => {
      this.listOfCities = result;
      this.listOfCities.forEach(val => console.log(val.name))
    })

  }


   openUpdateDialog(countryId?:number, countryName?:string): void{
    
   if(countryId) {
    console.log("Has country Id");
      let cap= '';
        this.apiService.getCapitalCity(countryId).subscribe(res =>{
         cap = res.capital_city;
         const dialogRef = this.dialog.open(UpdateDialogComponent, {
          data: {country_id: countryId, country_name: countryName, capital: cap}
         })
         dialogRef.afterClosed().subscribe(()=> {
          this.retrieveData()});
      
      })
    } else {
      console.log("Has no country Id");

      const dialogRef = this.dialog.open(UpdateDialogComponent, {
      data: {country_name: '', capital:  ''}
 
    });
    dialogRef.afterClosed().subscribe(result => {
      this.retrieveData();
    })
  }
  }

  delete(countryId?: number, countryName?:string) :void{
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {id: countryId, name: countryName}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.retrieveData();
    })
  }

  openMenu(event: Event): void{
    event.stopPropagation();
  }
}
