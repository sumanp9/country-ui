import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../service/api.service';
import { CityInterface } from '../country-interface';

@Component({
  selector: 'app-country-detail-dialog',
  templateUrl: './country-detail-dialog.component.html',
  styleUrls: ['./country-detail-dialog.component.css']
})


export class CountryDetailDialogComponent {

  city:CityInterface[] =[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private service: ApiService) {}

}
