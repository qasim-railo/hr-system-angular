import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeDocumentService } from '../../../core/services/employee-document.service';
import { EmployeeDocumentUpload } from '../../../core/models/employee-document.model';
import { MatCardModule } from '@angular/material/card';
import { MATERIAL_UI_MODULES } from '../../../shared/material-ui.imports';

@Component({
  selector: 'app-document-upload',
  standalone: true,
  imports: [
  MATERIAL_UI_MODULES
  ],
  templateUrl: './document-upload.component.html'
})
export class DocumentUploadComponent {
  @Input() employeeId!: number;
  @Output() uploadDone = new EventEmitter<void>();

  form: FormGroup;
  selectedFile!: File;
  documentTypes: string[] = ['Passport', 'Visa', 'Contract', 'QID', 'Other'];

  constructor(
    private fb: FormBuilder,
    private documentService: EmployeeDocumentService
  ) {
    this.form = this.fb.group({
      fileType: ['', Validators.required]
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files?.[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit(): void {
    if (this.form.invalid || !this.selectedFile) return;

    const uploadModel: EmployeeDocumentUpload = {
      employeeId: this.employeeId,
      file: this.selectedFile,
      fileType: this.form.value.fileType
    };

    this.documentService.upload(uploadModel).subscribe(() => {
      this.uploadDone.emit();
      this.form.reset();
      this.selectedFile = undefined!;
    });
  }
}
