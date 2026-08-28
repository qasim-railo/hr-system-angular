import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

type Language = 'en' | 'ar';
const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.dashboard': 'Dashboard', 'nav.notifications': 'Notifications', 'nav.myWorkspace': 'My Workspace',
    'nav.managerPortal': 'Manager Portal', 'nav.employees': 'Employees', 'nav.companies': 'Companies',
    'nav.departments': 'Departments', 'nav.documents': 'Documents', 'nav.assets': 'Assets',
    'nav.attendance': 'Attendance', 'nav.payroll': 'Payroll', 'nav.leaves': 'Leaves',
    'nav.reports': 'Reports', 'nav.settings': 'Settings', 'nav.language': 'Language',
    'language.english': 'English', 'language.arabic': 'العربية'
  },
  ar: {
    'nav.dashboard': 'لوحة التحكم', 'nav.notifications': 'الإشعارات', 'nav.myWorkspace': 'مساحتي',
    'nav.managerPortal': 'بوابة المدير', 'nav.employees': 'الموظفون', 'nav.companies': 'الشركات',
    'nav.departments': 'الأقسام', 'nav.documents': 'المستندات', 'nav.assets': 'الأصول',
    'nav.attendance': 'الحضور', 'nav.payroll': 'الرواتب', 'nav.leaves': 'الإجازات',
    'nav.reports': 'التقارير', 'nav.settings': 'الإعدادات', 'nav.language': 'اللغة',
    'language.english': 'English', 'language.arabic': 'العربية'
  }
};

@Injectable({ providedIn: 'root' })
export class LocalizationService {
  readonly language = signal<Language>((typeof localStorage !== 'undefined' && localStorage.getItem('peopleos-language') as Language) || 'en');
  constructor(private client: HttpClient) { this.applyDirection(); }
  t(key: string): string { return translations[this.language()][key] || key; }
  setLanguage(language: Language, persist = true) {
    this.language.set(language);
    if (typeof localStorage !== 'undefined' && persist) localStorage.setItem('peopleos-language', language);
    this.applyDirection();
    if (persist) this.client.put(`${environment.apiUrl}/language/user`, { language }).subscribe();
  }
  load() {
    this.client.get<{ userLanguage: Language; tenantDefaultLanguage: Language }>(`${environment.apiUrl}/language`).subscribe({
      next: x => this.setLanguage(x.userLanguage || x.tenantDefaultLanguage || 'en', false)
    });
  }
  private applyDirection() {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = this.language();
      document.documentElement.dir = this.language() === 'ar' ? 'rtl' : 'ltr';
    }
  }
}
