import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import { CityInterface, CountryInterface } from '../country-interface';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }

  getAllCountries(): Observable<CountryInterface[]> {
    return this.http.get<CountryInterface[]>('http://localhost:8081/api/getCountries');
  }

  getCapitalCity(country: String): Observable<any> {
    return this.http.get('http://localhost:8081/api/getCapitalCity/'+ country);
  }
}
