import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import { Cities, CountryData, CountryInterface } from '../country-interface';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private url = `http://localhost:8080/`;

  constructor(private http: HttpClient) { }

  getAllCountries(): Observable<CountryInterface[]> {
    return this.http.get<CountryInterface[]>(this.url+ `countries`);
  }

  getCapitalCity(id: number): Observable<any> {
    const params = new HttpParams().set('id', id.toString())
    return this.http.get(this.url + `capital`, {params});
  }

  addCountryDetails(countryData: CountryData): Observable<CountryData>{
    return this.http.post<CountryData>(this.url+ `country`, countryData);
  }

  updateCountry(countryData: CountryData): Observable<CountryData>{
    return this.http.put<CountryData>(this.url+ `country`, countryData);
  }

  deleteCountryData(id: number): Observable<any> {
    const params = new HttpParams().set('id', id.toString())
    return this.http.delete(this.url+ `country`,{params});
  }

  getAllCitiesOfCountry(countryId: number): Observable<Cities[]> {
    const params = new HttpParams().set('id', countryId.toString())
    return this.http.get<Cities[]>(this.url+ `cities`, {params});
  }

  addCityToCountry(countryId: number, name: string, cityId: number): Observable<any> {
    const requestData = {
      name: name,
      country_id: countryId,
      id: cityId
    }
    return this.http.post(this.url+ `city`, requestData );
  }

  updateCity(city: Cities): Observable<any> {
    return this.http.put(this.url+ `city`, city);
  }

  deleteCity(cityId: number): Observable<any> {
    console.log(cityId);
    const params = new HttpParams().set('id', cityId.toString())
    return this.http.delete(this.url+ `city`, {params});
  }

  updateCapital(data: CountryData): Observable<any>{
    console.log(data.capital);
    return this.http.put(this.url+ `capital`, {"id": data.id, "capital_city": data.capital});
  }
}
