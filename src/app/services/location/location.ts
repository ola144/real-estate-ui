import { Service } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Country {
  code: string;
  name: string;
  phoneCode: string;
  flag: string;
  currency: string;
}

export interface State {
  code: string;
  name: string;
  countryCode: string;
}

export interface City {
  name: string;
  stateCode: string;
  countryCode: string;
}

export interface CountriesResponse {
  success: boolean;
  count: number;
  countries: Country[];
}

export interface StatesResponse {
  success: boolean;
  count: number;
  country: {
    code: string;
    name: string;
  };
  states: State[];
}

const baseUrl = environment.apiBaseUrl;

@Service()
export class Location {
  private http = inject(HttpClient);

  private apiUrl = `${baseUrl}/locations`;

  getCountries(): Observable<CountriesResponse> {
    return this.http.get<CountriesResponse>(`${this.apiUrl}/countries`);
  }

  getStates(countryCode: string): Observable<StatesResponse> {
    return this.http.get<StatesResponse>(`${this.apiUrl}/states/${countryCode}`);
  }

  getCities(countryCode: string | undefined, stateCode: string) {
    return this.http.get<{
      success: boolean;
      count: number;
      cities: City[];
    }>(`${this.apiUrl}/cities/${countryCode}/${stateCode}`);
  }
}
