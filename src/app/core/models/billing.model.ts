export interface BillingPayment {
  subscriptionPaymentId: number;
  billingInvoiceId: number;
  amount: number;
  currency: string;
  paymentMethod: string;
  reference: string;
  status: string;
  paymentDate: string;
  notes?: string;
}

export interface BillingInvoice {
  billingInvoiceId: number;
  tenantId: number;
  tenantName: string;
  subscriptionId: number;
  invoiceNumber: string;
  currency: string;
  amount: number;
  amountPaid: number;
  status: string;
  issueDate: string;
  dueDate: string;
  periodStart?: string;
  periodEnd?: string;
  paidAt?: string;
  notes?: string;
  payments: BillingPayment[];
}

export interface BillingHistory {
  invoices: BillingInvoice[];
  payments: BillingPayment[];
}

export interface CreateBillingInvoiceRequest {
  amount: number;
  currency?: string;
  dueDate?: string;
  issueDate?: string;
  periodStart?: string;
  periodEnd?: string;
  planId?: number;
  notes?: string;
}

export interface RecordPaymentRequest {
  amount: number;
  currency?: string;
  paymentMethod?: string;
  reference?: string;
  applyToSubscription?: boolean;
  notes?: string;
}

export interface UpdateBillingInvoiceStatusRequest {
  status: 'Draft' | 'Open' | 'Paid' | 'Overdue' | 'Cancelled';
}
