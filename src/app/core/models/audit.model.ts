export interface AuditLog {
  auditLogId: number;
  action: string;
  entity: string;
  entityId: string;
  userId: string;
  createdAt: string;
  details: string;
}
