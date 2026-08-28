import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ImportJob } from '../models/import.model';
@Injectable({ providedIn: 'root' })
export class ImportService {
  private readonly url = `${environment.apiUrl}/imports`;
  constructor(private http: HttpClient) {}
  list() { return this.http.get<ImportJob[]>(this.url); }
  preview(entityType: string, file: File) { const data = new FormData(); data.append('entityType', entityType); data.append('file', file); return this.http.post<ImportJob>(`${this.url}/preview`, data); }
  execute(id: number) { return this.http.post<ImportJob>(`${this.url}/${id}/execute`, {}); }
}
