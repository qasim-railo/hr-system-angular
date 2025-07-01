import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  EmployeeDocument,
  EmployeeDocumentUpload
} from '../models/employee-document.model'; // adjust path as needed
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDocumentService {
  private baseUrl = environment.apiUrl+'/EmployeeDocuments';

  constructor(private http: HttpClient) {}

  /**
   * Get all documents for a specific employee
   */
  getByEmployeeId(employeeId: number): Observable<EmployeeDocument[]> {
    return this.http.get<EmployeeDocument[]>(`${this.baseUrl}/${employeeId}`);
  }

  /**
   * Upload a document using FormData
   */
  upload(data: EmployeeDocumentUpload): Observable<any> {
    const formData = new FormData();
    formData.append('employeeId', String(data.employeeId));
    formData.append('fileType', data.fileType);
    formData.append('file', data.file); // must be File object

    return this.http.post(`${this.baseUrl}/upload`, formData);
  }

  /**
   * Download document file by ID
   */
  download(documentId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/download/${documentId}`, {
      responseType: 'blob'
    });
  }

  /**
   * Delete document by ID
   */
  delete(documentId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${documentId}`);
  }
}
