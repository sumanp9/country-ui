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
  countryId: number =0;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public service: ApiService
  ){
    this.countryName = data.name;
    this.countryId = data.id;
  }

  delete(): void{
   this.service.deleteCountryData(this.countryId).subscribe(result =>{
      this.dialogRef.close();
    })
  }

  close(): void{
    this.dialogRef.close();
  }
}
