interface StatusBadgeProps {
  status: "Active" | "Inactive" | "Pending";
}

const statusStyles = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-gray-100 text-gray-600",
  Pending: "bg-yellow-100 text-yellow-700",
};

function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;
