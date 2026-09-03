import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Country } from '../models/country.model';
import { CurrencyMaster, TimeZoneMaster } from '../models/master-data.model';

@Injectable({ providedIn: 'root' })
export class CountryService {
  constructor(private http: HttpClient) {}

  list(): Observable<Country[]> {
    return this.http.get<Country[]>(`${environment.apiUrl}/countries`);
  }

  listCurrencies(): Observable<CurrencyMaster[]> {
    return this.http.get<CurrencyMaster[]>(`${environment.apiUrl}/countries/currencies`);
  }

  listTimeZones(countryCode?: string): Observable<TimeZoneMaster[]> {
    const suffix = countryCode ? `?countryCode=${encodeURIComponent(countryCode)}` : '';
    return this.http.get<TimeZoneMaster[]>(`${environment.apiUrl}/countries/time-zones${suffix}`);
  }
}
