import { Users, Wifi, IndianRupee, CreditCard } from "lucide-react";
import MetricCard from "@/components/common/MetricCard";
import SubscribersTable from "@/features/dashboard/components/SubscribersTable";
import { useSubscribers } from "@/features/dashboard/hooks/useSubscribers";

const Dashboard = () => {
  const { metrics, isLoading, error } = useSubscribers();

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Total Customers"
          value={metrics.totalCustomers.toLocaleString()}
          icon={Users}
          isLoading={isLoading}
        />

        <MetricCard
          title="Active Connections"
          value={metrics.activeConnections.toLocaleString()}
          icon={Wifi}
          isLoading={isLoading}
        />

        <MetricCard
          title="Monthly Revenue"
          value={`₹${metrics.monthlyRevenue.toLocaleString("en-IN")}`}
          icon={IndianRupee}
          isLoading={isLoading}
        />

        <MetricCard
          title="Pending Payments"
          value={`₹${metrics.pendingPaymentAmount.toLocaleString("en-IN")}`}
          icon={CreditCard}
          trend={`${metrics.overduePayments} overdue`}
          trendLabel="payments"
          isLoading={isLoading}
        />
      </div>

      <SubscribersTable />
    </>
  );
};

export default Dashboard;
