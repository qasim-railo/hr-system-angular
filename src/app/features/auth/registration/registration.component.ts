import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RegistrationService } from '../../../core/services/registration.service';

@Component({
  standalone: true,
  selector: 'app-registration',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  loading = false;
  error = '';
  result?: { tenantCode: string; administratorUsername: string };
  form = this.fb.group({
    legalName: ['', [Validators.required, Validators.maxLength(200)]], tradeName: [''],
    commercialRegistrationNumber: ['', Validators.required], industry: [''], employeeCount: [1, [Validators.required, Validators.min(1)]],
    address: ['', Validators.required], country: ['QA', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
    phone: ['', Validators.required], email: ['', [Validators.required, Validators.email]], website: ['', Validators.pattern(/^https?:\/\/.+/)],
    contactPerson: ['', Validators.required], contactPhone: ['', Validators.required],
    administratorUsername: ['', Validators.required], administratorPassword: ['', [Validators.required, Validators.minLength(6)]],
    administratorName: ['', Validators.required], administratorEmail: ['', [Validators.required, Validators.email]], administratorPhone: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private registration: RegistrationService, private router: Router) {}

  submit(): void {
    this.error = '';
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true;
    this.registration.register(this.form.getRawValue() as any).subscribe({
      next: response => { this.loading = false; this.result = response; },
      error: error => { this.loading = false; this.error = error?.error || 'Registration could not be completed.'; }
    });
  }

  goToLogin(): void { this.router.navigate(['/login']); }
}
