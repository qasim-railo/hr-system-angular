import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { NotificationInboxService } from '../../core/services/notification-inbox.service';
import { NotificationItem } from '../../core/models/notification.model';

@Component({
  standalone: true,
  selector: 'app-notifications',
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent implements OnInit {
  private service = inject(NotificationInboxService);
  items: NotificationItem[] = [];
  error = '';
  ngOnInit() { this.load(); }
  load() { this.service.get().subscribe({ next: x => this.items = x, error: () => this.error = 'Unable to load notifications.' }); }
  markRead(item: NotificationItem) {
    this.service.markRead(item.id).subscribe({ next: () => item.isRead = true, error: () => this.error = 'Unable to update notification.' });
  }
}
