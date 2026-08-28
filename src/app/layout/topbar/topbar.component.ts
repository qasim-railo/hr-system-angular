import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalizationService } from '../../core/services/localization.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  constructor(private router: Router, public localization: LocalizationService) { }

  toggleLanguage() {
    this.localization.setLanguage(this.localization.language() === 'en' ? 'ar' : 'en');
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }
}
