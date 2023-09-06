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

  getCapitalCity(country: String): Observable<any> {

    console.log("Inserver")
    return this.http.get(this.url + `getCapitalCity/`+ country);
  }

  addCountryDetails(countryData: CountryData): Observable<CountryData>{

    console.log(countryData)

    return this.http.post<CountryData>(this.url+ `addCountryDetails`, countryData);

  }
}
