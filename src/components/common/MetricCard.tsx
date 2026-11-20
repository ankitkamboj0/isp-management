import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendLabel?: string;
  isLoading?: boolean;
}

const MetricCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendLabel,
  isLoading = false,
}: MetricCardProps) => {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-500">{title}</p>

          <div className="rounded-lg bg-gray-100 p-2">
            <Icon className="h-4 w-4 text-gray-600" />
          </div>
        </div>

        {isLoading ? (
          <div className="mt-3 h-8 w-32 animate-pulse rounded bg-gray-200" />
        ) : (
          <h3 className="mt-3 text-2xl font-bold tracking-tight">{value}</h3>
        )}

        {!isLoading && trend && (
          <p className="mt-2 text-xs text-gray-500">
            <span className="font-medium text-green-600">{trend}</span>{" "}
            {trendLabel}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard;