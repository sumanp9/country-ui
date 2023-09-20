import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule} from '@angular/material/dialog'; 
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';  
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion'; 
import {MatMenuModule} from '@angular/material/menu'; 
import {HttpClientModule} from '@angular/common/http';

import { CountryDetailDialogComponent } from './country-detail-dialog/country-detail-dialog.component';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component'


@NgModule({
  declarations: [
    AppComponent,
    CountryDetailDialogComponent,
    UpdateDialogComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatListModule,
    MatDialogModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatMenuModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
