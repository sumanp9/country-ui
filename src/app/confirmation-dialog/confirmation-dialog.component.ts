import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {

  countryName: string = "";

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    public service: ApiService
  ){
    this.countryName = data;

  }


  delete(): void{
    this.service.deleteCountryData(this.countryName).subscribe(result =>{
      this.dialogRef.close();
    })
  }

  close(): void{
    this.dialogRef.close();
  }
}
