import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  CreateSupportTicketMessageRequest,
  CreateSupportTicketRequest,
  SupportHelpCenter,
  SupportTicket,
  UpdateSupportTicketStatusRequest
} from '../models/support.model';

@Injectable({ providedIn: 'root' })
export class SupportService {
  private readonly apiUrl = `${environment.apiUrl}/support`;

  constructor(private http: HttpClient) {}

  getHelpCenter(): Observable<SupportHelpCenter> {
    return this.http.get<SupportHelpCenter>(`${this.apiUrl}/help-center`);
  }

  getTickets(): Observable<SupportTicket[]> {
    return this.http.get<SupportTicket[]>(`${this.apiUrl}/tickets`);
  }

  getTicket(ticketId: number): Observable<SupportTicket> {
    return this.http.get<SupportTicket>(`${this.apiUrl}/tickets/${ticketId}`);
  }

  createTicket(request: CreateSupportTicketRequest): Observable<SupportTicket> {
    return this.http.post<SupportTicket>(`${this.apiUrl}/tickets`, request);
  }

  addTicketMessage(ticketId: number, request: CreateSupportTicketMessageRequest): Observable<SupportTicket> {
    return this.http.post<SupportTicket>(`${this.apiUrl}/tickets/${ticketId}/messages`, request);
  }

  updateTicketStatus(ticketId: number, request: UpdateSupportTicketStatusRequest): Observable<SupportTicket> {
    return this.http.put<SupportTicket>(`${this.apiUrl}/tickets/${ticketId}/status`, request);
  }
}
