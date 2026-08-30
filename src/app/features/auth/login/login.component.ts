import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MATERIAL_UI_MODULES } from '../../../shared/material-ui.imports';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { AlertService } from '../../../core/services/alert.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MATERIAL_UI_MODULES, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  submitted = false;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    const { email, password } = this.loginForm.value;

    this.authService.login(email!.trim(), password!).subscribe({
      next: (response) => {
        this.loading = false;
        this.authService.setToken(response.token);
        this.alertService.success('Login successful'),
        this.router.navigate([this.getLandingRoute()]);
      },
      error: (err) => {
        this.loading = false;
         this.alertService.error(err?.error || 'Unable to sign in with this email and password.');
      
      }
    });
  }

  private getLandingRoute(): string {
    if (this.authService.hasPermission('Platform.Tenants')) return '/platform-admin';
    if (this.authService.hasPermission('Users.Manage')) return '/dashboard';
    if (this.authService.hasRole('Manager')) return '/manager-portal';
    if (this.authService.hasRole('Employee')) return '/my-workspace';
    return this.authService.hasPermission('Employees.View') ? '/dashboard' : '/my-workspace';
  }
}