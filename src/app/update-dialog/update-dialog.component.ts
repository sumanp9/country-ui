import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CountryData } from '../country-interface';
import { ApiService } from '../service/api.service';

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

  constructor(
    public dialogRef: MatDialogRef<UpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public service: ApiService
  ) {
    this.countryData.id = data.country_id;
    this.countryData.country_name = data.country_name ;
    this.countryData.capital = data.capital;
  }

  onSubmit(): void {
    console.log(this.countryData.country_name, this.countryData.capital);
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

  close(): void{
    this.dialogRef.close();
  }

  disabledButton(countryValue:string, cityValue: string): boolean {
    if(countryValue == "" || cityValue == "") return true
    return false;
  }
}
