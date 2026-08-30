import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface RegistrationRequest {
  legalName: string;
  commercialRegistrationNumber: string;
  country: string;
  phone: string;
  administratorPassword: string;
  administratorName: string;
  administratorEmail: string;
}

export interface RegistrationResult {
  tenantCode: string; administratorEmail: string; status: string; completedStep: number;
}

@Injectable({ providedIn: 'root' })
export class RegistrationService {
  private readonly url = `${environment.apiUrl}/registration`;
  constructor(private http: HttpClient) {}
  register(request: RegistrationRequest): Observable<RegistrationResult> {
    return this.http.post<RegistrationResult>(this.url, request);
  }
}
