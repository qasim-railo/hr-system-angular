import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MATERIAL_UI_MODULES } from '../../../shared/material-ui.imports';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { AlertService } from '../../../core/services/alert.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MATERIAL_UI_MODULES, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = this.fb.group({
    username: ['', Validators.required],
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

    const { username, password } = this.loginForm.value;

    this.authService.login(username!, password!).subscribe({
      next: (response) => {
        this.loading = false;
        this.alertService.success('Login successful'),
        this.router.navigate(['/dashboard']);  
      },
      error: (err) => {
        this.loading = false;
         this.alertService.error('Error Occured');
      
      }
    });
  }
}