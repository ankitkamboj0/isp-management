export interface Subscriber {
  id: number;
  name: string;
  email: string;
  ipAddress: string;
  plan: string;
  status: "Active" | "Inactive";
  monthlyAmount: number;
  paymentStatus: "Paid" | "Pending" | "Overdue";
}

export interface SubscriberMetrics {
  totalCustomers: number;
  activeConnections: number;
  monthlyRevenue: number;
  pendingPaymentAmount: number;
  overduePayments: number;
}

export interface SubscribersResponse {
  subscribers: Subscriber[];
  metrics: SubscriberMetrics;
}

export interface SubscribersContextType extends SubscribersResponse {
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}
