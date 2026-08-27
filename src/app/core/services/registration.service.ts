import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface RegistrationRequest {
  legalName: string; tradeName?: string; commercialRegistrationNumber: string; industry?: string;
  employeeCount: number; address: string; country: string; phone: string; email: string; website?: string;
  contactPerson: string; contactPhone: string; administratorUsername: string; administratorPassword: string;
  administratorName: string; administratorEmail: string; administratorPhone: string;
}

export interface RegistrationResult {
  tenantCode: string; administratorUsername: string; status: string; completedStep: number;
}

@Injectable({ providedIn: 'root' })
export class RegistrationService {
  private readonly url = `${environment.apiUrl}/registration`;
  constructor(private http: HttpClient) {}
  register(request: RegistrationRequest): Observable<RegistrationResult> {
    return this.http.post<RegistrationResult>(this.url, request);
  }
}
