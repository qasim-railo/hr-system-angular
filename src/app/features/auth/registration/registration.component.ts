import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AsYouType, CountryCode, getCountryCallingCode, parsePhoneNumberFromString } from 'libphonenumber-js';
import { RegistrationService } from '../../../core/services/registration.service';
import { Country } from '../../../core/models/country.model';
import { CountryService } from '../../../core/services/country.service';

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
  result?: { tenantCode: string; administratorEmail: string };
  countries: Country[] = [];
  form = this.fb.nonNullable.group({
    legalName: ['', [Validators.required, Validators.maxLength(200)]],
    commercialRegistrationNumber: ['', [Validators.required, Validators.maxLength(50)]],
    country: ['QA' as CountryCode, Validators.required],
    phone: ['', [Validators.required, Validators.maxLength(40)]],
    administratorPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    administratorName: ['', Validators.required], administratorEmail: ['', [Validators.required, Validators.email]]
  });

  constructor(
    private fb: FormBuilder,
    private registration: RegistrationService,
    private countriesService: CountryService,
    private router: Router
  ) {
    this.countriesService.list().subscribe({
      next: countries => this.countries = countries,
      error: () => this.error = 'Unable to load available countries.'
    });
  }

  submit(): void {
    this.error = '';
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const value = this.form.getRawValue();
    if (value.administratorPassword !== value.confirmPassword) {
      this.error = 'Password and confirm password must match.';
      return;
    }
    const parsedPhone = parsePhoneNumberFromString(value.phone, value.country as CountryCode);
    if (!parsedPhone?.isValid()) {
      this.error = `Enter a valid mobile number for ${this.countryName(value.country)}.`;
      return;
    }

    this.loading = true;
    const { confirmPassword, ...request } = value;
    this.registration.register({ ...request, phone: parsedPhone.number }).subscribe({
      next: response => { this.loading = false; this.result = response; },
      error: error => { this.loading = false; this.error = this.getErrorMessage(error); }
    });
  }

  formatPhone(): void {
    const country = this.form.controls.country.value;
    const value = this.form.controls.phone.value;
    if (!country || !value) return;
    this.form.controls.phone.setValue(new AsYouType(country).input(value), { emitEvent: false });
  }

  countryName(country: string): string {
    return this.countries.find(item => item.code === country)?.name ?? 'the selected country';
  }

  get selectedDialCode(): string {
    const country = this.form.controls.country.value;
    return country ? `+${getCountryCallingCode(country as CountryCode)}` : '';
  }

  goToLogin(): void { this.router.navigate(['/login']); }

  private getErrorMessage(error: any): string {
    if (typeof error?.error === 'string') return error.error;
    if (error?.error?.errors) {
      return Object.values(error.error.errors).flat().join(' ');
    }

    return error?.error?.detail || error?.error?.title || 'Registration could not be completed.';
  }
}
