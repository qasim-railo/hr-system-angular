import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface CustomFieldDefinition {
  customFieldDefinitionId?: number;
  key: string;
  label: string;
  entityType: string;
  fieldType: number;
  isRequired: boolean;
  options: string[];
  displayOrder: number;
  isActive: boolean;
}

@Injectable({ providedIn: 'root' })
export class CustomFieldService {
  private readonly url = `${environment.apiUrl}/custom-fields`;
  constructor(private http: HttpClient) {}
  getDefinitions(includeInactive = true): Observable<CustomFieldDefinition[]> {
    return this.http.get<CustomFieldDefinition[]>(this.url, { params: { includeInactive } });
  }
  create(definition: CustomFieldDefinition): Observable<CustomFieldDefinition> {
    return this.http.post<CustomFieldDefinition>(this.url, definition);
  }
  update(id: number, definition: CustomFieldDefinition): Observable<CustomFieldDefinition> {
    return this.http.put<CustomFieldDefinition>(`${this.url}/${id}`, definition);
  }
  archive(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
