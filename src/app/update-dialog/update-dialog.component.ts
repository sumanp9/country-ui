import { Dialog } from '@angular/cdk/dialog';
import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CountryData } from '../country-interface';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent {

  countryData: CountryData = {
    country_name: "",
  capital:  ""
  }

  constructor(
    public dialogRef: MatDialogRef<UpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CountryData,
    public service: ApiService
  ) {}

  onSubmit(): void {
    console.log(this.countryData.country_name, this.countryData.capital);
    this.service.addCountryDetails(this.countryData).subscribe((response) => {
      console.log("Country added !!!!", response);
    });
    this.dialogRef.close();
  }
}
