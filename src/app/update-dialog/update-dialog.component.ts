import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CountryData, Cities } from '../country-interface';
import { ApiService } from '../service/api.service'

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent {

  countryData: CountryData = {
    id: 0,
    country_name: "",
    capital: ""
  }

  listOfCities: Cities[] =[];

  addCityButtonPressed = false;
  showButtons: boolean[] = [];

  constructor(
    public dialogRef: MatDialogRef<UpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public service: ApiService,
  ) {
    this.countryData.id = data.country_id || 0;
    this.countryData.country_name = data.country_name ;
    this.countryData.capital = data.capital;
    
    this.getCities(this.countryData.id);    
  }

  onSubmit(): void {
    console.log(this.countryData.country_name, this.countryData.capital);
    this.listOfCities.forEach(m => console.log(m.name));
    this.service.addCountryDetails(this.countryData).subscribe((response) => {
      console.log("Country added !!!!", response);
    });
    this.dialogRef.close();
  }

  onUpdate(): void{
    console.log("OnUpdate method " + this.countryData.country_name, this.countryData.capital , this.countryData.id)

    this.service.updateCountryDetails(this.countryData).subscribe(() => {
    });
    this.dialogRef.close();
  }

  addCity(): void{
    this.addCityButtonPressed = true;

    const newCity: Cities = {
      id:0,
      name:''
    }
    this.listOfCities.unshift(newCity);
    this.showButtons.unshift(false);

  }

  saveCity(city: Cities): void{
    this.addCityButtonPressed = false;
    this.listOfCities.forEach(c => {
      console.log(c.id, c.name)
    })
    this.service.addCityToCountry(this.countryData.id, city.name, city.id).subscribe(res =>{
      this.refreshDialogData();
    }); 
    const cityIndex = this.listOfCities.indexOf(city);
    
    this.showButtons[cityIndex] = false;

  }

  deleteCity(city: Cities): void{
    if(city.id !=0) {
      console.log("deleting")
      this.service.deleteCity(city.id).subscribe(res=> 
        this.refreshDialogData());
    }

    

    
  }

  getCities(countryid: number) {
    this.service.getAllCitiesOfCountry(countryid).subscribe(result => {
      this.listOfCities = result;
      this.showButtons = new Array(this.listOfCities.length).fill(false); // Initialize edit button status for each city
    })
  }

  refreshDialogData(): void {
    // Refresh the list of cities
    this.getCities(this.countryData.id);
  }


  close(): void{

    this.dialogRef.close();
  }

  disabledButton(countryValue:string, cityValue: string): boolean {
    if(countryValue == "" || cityValue == "") return true
    return false;
  }

  editButton(cityIndex: number): void{
    this.showButtons[cityIndex] = true;
  }
}
