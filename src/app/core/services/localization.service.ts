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
    'language.english': 'English', 'language.arabic': 'العربية',
    'employee.list': 'Employee List', 'employee.add': 'Add Employee', 'employee.search': 'Search employees',
    'employee.status': 'Status', 'employee.category': 'Category', 'employee.all': 'All',
    'employee.company': 'Companies', 'employee.department': 'Departments', 'employee.joiningFrom': 'Joining from',
    'employee.joiningTo': 'Joining to', 'employee.apply': 'Apply filters', 'employee.clear': 'Clear filters',
    'employee.photo': 'Photo', 'employee.id': 'Employee ID', 'employee.fullName': 'Full Name',
    'employee.designation': 'Designation', 'employee.joiningDate': 'Joining Date', 'employee.actions': 'Actions',
    'employee.edit': 'Edit', 'employee.profile': 'View profile', 'employee.none': 'No employees found.',
    'settings.title': 'Settings center', 'settings.loading': 'Loading settings...', 'settings.save': 'Save',
    'settings.default': 'Default', 'settings.override': 'Tenant override'
  },
  ar: {
    'nav.dashboard': 'لوحة التحكم', 'nav.notifications': 'الإشعارات', 'nav.myWorkspace': 'مساحتي',
    'nav.managerPortal': 'بوابة المدير', 'nav.employees': 'الموظفون', 'nav.companies': 'الشركات',
    'nav.departments': 'الأقسام', 'nav.documents': 'المستندات', 'nav.assets': 'الأصول',
    'nav.attendance': 'الحضور', 'nav.payroll': 'الرواتب', 'nav.leaves': 'الإجازات',
    'nav.reports': 'التقارير', 'nav.settings': 'الإعدادات', 'nav.language': 'اللغة',
    'language.english': 'English', 'language.arabic': 'العربية',
    'employee.list': 'قائمة الموظفين', 'employee.add': 'إضافة موظف', 'employee.search': 'البحث عن الموظفين',
    'employee.status': 'الحالة', 'employee.category': 'الفئة', 'employee.all': 'الكل',
    'employee.company': 'الشركات', 'employee.department': 'الأقسام', 'employee.joiningFrom': 'تاريخ الانضمام من',
    'employee.joiningTo': 'تاريخ الانضمام إلى', 'employee.apply': 'تطبيق المرشحات', 'employee.clear': 'مسح المرشحات',
    'employee.photo': 'الصورة', 'employee.id': 'رقم الموظف', 'employee.fullName': 'الاسم الكامل',
    'employee.designation': 'المسمى الوظيفي', 'employee.joiningDate': 'تاريخ الانضمام', 'employee.actions': 'الإجراءات',
    'employee.edit': 'تعديل', 'employee.profile': 'عرض الملف الشخصي', 'employee.none': 'لم يتم العثور على موظفين.',
    'settings.title': 'مركز الإعدادات', 'settings.loading': 'جار تحميل الإعدادات...', 'settings.save': 'حفظ',
    'settings.default': 'الافتراضي', 'settings.override': 'تعديل المستأجر'
  }
};

@Injectable({ providedIn: 'root' })
export class LocalizationService {
  private languageOverridePending = false;
  readonly language = signal<Language>((typeof localStorage !== 'undefined' && localStorage.getItem('peopleos-language') as Language) || 'en');
  constructor(private client: HttpClient) { this.applyDirection(); }
  t(key: string): string { return translations[this.language()][key] || key; }
  setLanguage(language: Language, persist = true) {
    if (persist) this.languageOverridePending = true;
    this.language.set(language);
    if (typeof localStorage !== 'undefined' && persist) localStorage.setItem('peopleos-language', language);
    this.applyDirection();
    if (persist) this.client.put(`${environment.apiUrl}/language/user`, { language }).subscribe();
  }
  load() {
    this.client.get<{ userLanguage: Language; tenantDefaultLanguage: Language }>(`${environment.apiUrl}/language`).subscribe({
      next: x => {
        if (!this.languageOverridePending) {
          this.setLanguage(x.userLanguage || x.tenantDefaultLanguage || 'en', false);
        }
        this.languageOverridePending = false;
      }
    });
  }
  private applyDirection() {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = this.language();
      document.documentElement.dir = this.language() === 'ar' ? 'rtl' : 'ltr';
    }
  }
}
