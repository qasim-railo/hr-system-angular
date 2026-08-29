export interface SupportArticle {
  id: number;
  category: string;
  title: string;
  summary: string;
  content: string;
  tags: string;
}

export interface SupportHelpCenter {
  contactEmail: string;
  contactPhone: string;
  supportHours: string;
  articles: SupportArticle[];
}

export interface SupportTicketAttachment {
  id: number;
  fileId: number;
  fileName: string;
  fileType?: string;
}

export interface SupportTicketMessage {
  id: number;
  senderUserId?: number | null;
  senderName: string;
  senderRole: string;
  message: string;
  isInternal: boolean;
  createdAt: string;
  attachments: SupportTicketAttachment[];
}

export interface SupportTicket {
  id: number;
  tenantId: number;
  category: string;
  subject: string;
  description: string;
  priority: string;
  status: string;
  requesterUserId?: number | null;
  requesterName: string;
  requesterEmail: string;
  source?: string | null;
  createdAt: string;
  updatedAt: string;
  closedAt?: string | null;
  messages: SupportTicketMessage[];
  attachments: SupportTicketAttachment[];
}

export interface CreateSupportTicketRequest {
  category: string;
  subject: string;
  description: string;
  priority: string;
  requesterName?: string;
  requesterEmail?: string;
  source?: string;
  attachmentFileIds?: number[];
}

export interface CreateSupportTicketMessageRequest {
  message: string;
  attachmentFileIds?: number[];
  isInternal?: boolean;
}

export interface UpdateSupportTicketStatusRequest {
  status: string;
}
