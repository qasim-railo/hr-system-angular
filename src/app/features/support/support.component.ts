import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SupportService } from '../../core/services/support.service';
import { SupportHelpCenter, SupportTicket } from '../../core/models/support.model';

@Component({
  standalone: true,
  selector: 'app-support',
  imports: [CommonModule, FormsModule],
  templateUrl: './support.component.html',
  styleUrl: './support.component.scss'
})
export class SupportComponent implements OnInit {
  helpCenter?: SupportHelpCenter;
  tickets: SupportTicket[] = [];
  form = {
    category: 'General',
    subject: '',
    description: '',
    priority: 'Medium'
  };
  submissionError = '';
  successMessage = '';
  submitting = false;

  constructor(private support: SupportService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.support.getHelpCenter().subscribe({
      next: center => this.helpCenter = center,
      error: () => this.submissionError = 'Unable to load the help center.'
    });

    this.support.getTickets().subscribe({
      next: tickets => this.tickets = tickets,
      error: () => this.submissionError = 'Unable to load your support tickets.'
    });
  }

  submit(): void {
    if (!this.form.subject.trim() || !this.form.description.trim()) {
      this.submissionError = 'Please add both a subject and a description.';
      this.successMessage = '';
      return;
    }

    this.submitting = true;
    this.submissionError = '';
    this.successMessage = '';
    this.support.createTicket({
      category: this.form.category,
      subject: this.form.subject.trim(),
      description: this.form.description.trim(),
      priority: this.form.priority,
      source: 'InApp'
    }).subscribe({
      next: ticket => {
        this.tickets = [ticket, ...this.tickets];
        this.form = { category: 'General', subject: '', description: '', priority: 'Medium' };
        this.successMessage = 'Support request created successfully.';
        this.submitting = false;
      },
      error: err => {
        this.submissionError = err?.error?.message || 'Unable to create your support request.';
        this.submitting = false;
      }
    });
  }

  updateStatus(ticket: SupportTicket, status: string): void {
    this.support.updateTicketStatus(ticket.id, { status }).subscribe({
      next: updated => {
        const index = this.tickets.findIndex(item => item.id === ticket.id);
        if (index >= 0) { this.tickets[index] = updated; }
      },
      error: () => this.submissionError = 'Unable to update this ticket.'
    });
  }
}
