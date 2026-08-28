export interface NotificationItem {
  id: number;
  eventCode: string;
  channel: string;
  subject: string;
  body: string;
  isRead: boolean;
  createdAt: string;
}
