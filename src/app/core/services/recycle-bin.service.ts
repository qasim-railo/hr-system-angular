import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RecycleBinItem } from '../models/recycle-bin.model';

@Injectable({ providedIn: 'root' })
export class RecycleBinService {
  private readonly url = `${environment.apiUrl}/recycle-bin`;
  constructor(private http: HttpClient) {}
  get(): Observable<RecycleBinItem[]> { return this.http.get<RecycleBinItem[]>(this.url); }
  restore(item: RecycleBinItem): Observable<void> { return this.http.post<void>(`${this.url}/${item.entityType}/${item.entityId}/restore`, {}); }
  purge(item: RecycleBinItem): Observable<void> { return this.http.delete<void>(`${this.url}/${item.entityType}/${item.entityId}/purge`); }
}
