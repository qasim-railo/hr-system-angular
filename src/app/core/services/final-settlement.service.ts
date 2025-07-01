import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FinalSettlementDto, FinalSettlementResponseDto } from '../models/final-settlement.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinalSettlementService {
  private apiUrl = environment.apiUrl+'/finalsettlement';

  constructor(private http: HttpClient) {}

  // Get all final settlements
  getAll(): Observable<FinalSettlementResponseDto[]> {
    return this.http.get<FinalSettlementResponseDto[]>(this.apiUrl);
  }

  // Get by ID
  getById(id: number): Observable<FinalSettlementResponseDto> {
    return this.http.get<FinalSettlementResponseDto>(`${this.apiUrl}/${id}`);
  }

  // Generate settlement for employeeId
  generate(employeeId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/generate/${employeeId}`, {});
  }

  // Signoff by id
  signOff(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/signoff/${id}`, {});
  }
}
