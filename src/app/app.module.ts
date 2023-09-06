import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import {MatDialog, MatDialogModule} from '@angular/material/dialog'; 
import {MatExpansionModule} from '@angular/material/expansion'; 
import {HttpClientModule} from '@angular/common/http';
import { CountryDetailDialogComponent } from './country-detail-dialog/country-detail-dialog.component'


@NgModule({
  declarations: [
    AppComponent,
    CountryDetailDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatListModule,
    MatDialogModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
