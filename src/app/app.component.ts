import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from './service/api.service';
import { CountryInterface } from './country-interface';
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

  constructor(private apiService: ApiService, private dialog: MatDialog) { 
  } 

  ngOnInit(): void{
    this.retrieveData();
  }

  retrieveData(): void{
    this.apiService.getAllCountries().subscribe(data => {
      this.listOfCountries = data;
    })
  }
  
   getCapitalCity(id: number) {

    this.panelClicked[id] = !this.panelClicked[id];

    this.apiService.getCapitalCity(id).subscribe(result => {
      
      this.capitalCity = result.capital_city;
      console.log(this.capitalCity)
       });  
  }


   openUpdateDialog(countryId?:number, countryName?:string): void{
    console.log(countryName) 
    
   if(countryId) {
      let cap= '';
        this.apiService.getCapitalCity(countryId).subscribe(res =>{
         cap = res.capital_city;
         const dialogRef = this.dialog.open(UpdateDialogComponent, {
          data: {country_id: countryId, country_name: countryName, capital: cap}
         })
         dialogRef.afterClosed().subscribe(()=> this.retrieveData());
      
      })
    } else {

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
