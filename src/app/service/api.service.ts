import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import { CityInterface, CountryData, CountryInterface } from '../country-interface';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private url = `http://localhost:8081/api/`;

  constructor(private http: HttpClient) { }

  getAllCountries(): Observable<CountryInterface[]> {
    return this.http.get<CountryInterface[]>(this.url+ `getCountries`);
  }

  getCapitalCity(id: number): Observable<any> {
    return this.http.get(this.url + `getCapitalCity/`+ id);
  }

  addCountryDetails(countryData: CountryData): Observable<CountryData>{
    return this.http.post<CountryData>(this.url+ `addCountryDetails`, countryData);
  }

  updateCountryDetails(countryData: CountryData): Observable<CountryData>{
    console.log(countryData)
    return this.http.put<CountryData>(this.url+ `updateCountry`, countryData);
  }

  deleteCountryData(id: number): Observable<any> {
    return this.http.delete(this.url+ `deleteCountryData/`+ id);
  }
}
