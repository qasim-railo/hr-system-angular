import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ExportOption } from '../models/export.model';

@Injectable({ providedIn: 'root' })
export class ExportService {
  private readonly url = `${environment.apiUrl}/exports`;
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<ExportOption[]>(this.url);
  }

  download(code: string) {
    return this.http.get(`${this.url}/${code}`, { responseType: 'blob' });
  }
}
