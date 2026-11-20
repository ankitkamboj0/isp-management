import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { subscriberApi } from "@/features/dashboard/api/subscriberApi";
import type {
  SubscribersContextType,
  SubscribersResponse,
} from "@/features/dashboard/types/subscriber";

export const SubscribersContext = createContext<SubscribersContextType | null>(null);

interface SubscribersProviderProps {
  children: ReactNode;
}

const initialData: SubscribersResponse = {
  subscribers: [],
  metrics: {
    totalCustomers: 0,
    activeConnections: 0,
    monthlyRevenue: 0,
    pendingPaymentAmount: 0,
    overduePayments: 0,
  },
};

export const SubscribersProvider = ({
  children,
}: SubscribersProviderProps) => {
  const [data, setData] = useState<SubscribersResponse>(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscribers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await subscriberApi.getSubscribers();

      setData(response);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load subscribers",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubscribers();
  }, [fetchSubscribers]);

  return (
    <SubscribersContext.Provider
      value={{
        ...data,
        isLoading,
        error,
        refetch: fetchSubscribers,
      }}
    >
      {children}
    </SubscribersContext.Provider>
  );
};