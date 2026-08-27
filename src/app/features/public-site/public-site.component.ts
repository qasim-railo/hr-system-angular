import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

type PublicPage = 'home' | 'features' | 'solutions' | 'pricing' | 'about' | 'faq' | 'contact';
interface PublicFeature {
  icon: string;
  title: string;
  text: string;
}

@Component({
  standalone: true,
  selector: 'app-public-site',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './public-site.component.html',
  styleUrl: './public-site.component.scss'
})
export class PublicSiteComponent {
  readonly page: PublicPage;
  readonly features: PublicFeature[] = [
    { icon: 'badge', title: 'HR & employees', text: 'Keep one trusted employee record from joining to offboarding.' },
    { icon: 'payments', title: 'Payroll & payslips', text: 'Run accurate payroll with clear approvals and employee visibility.' },
    { icon: 'fact_check', title: 'Attendance', text: 'Bring working time, shifts and overtime into focus.' },
    { icon: 'beach_access', title: 'Leave management', text: 'Make leave requests and balances simple for everyone.' },
    { icon: 'description', title: 'Documents', text: 'Keep important employee documents organized and accessible.' },
    { icon: 'bar_chart', title: 'Reports', text: 'Turn everyday HR data into decisions your team can act on.' }
  ];
  contactSent = false;

  constructor(route: ActivatedRoute) {
    this.page = (route.snapshot.data['page'] ?? 'home') as PublicPage;
  }

  markContactSent(): void {
    this.contactSent = true;
  }
}
