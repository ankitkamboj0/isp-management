import { useState } from "react";
import { Search, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";
import { useSubscribers } from "../hooks/useSubscribers";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SubscribersTable = () => {
  const [search, setSearch] = useState("");

  const { subscribers, isLoading, error, refetch } = useSubscribers();

  const filteredCustomers = subscribers.filter((subscriber) =>
    `${subscriber.name} ${subscriber.email} ${subscriber.ipAddress}`
      .toLowerCase()
      .includes(search.toLowerCase().trim()),
  );

  // Loading state
  const renderLoadingState = () => (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <TableRow key={index}>
          {Array.from({ length: 5 }).map((_, cellIndex) => (
            <TableCell key={cellIndex}>
              <div className="h-4 w-full max-w-35 animate-pulse rounded bg-gray-200" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );

  // Error state
  const renderErrorState = () => (
    <TableRow>
      <TableCell colSpan={5} className="h-40 text-center">
        <div className="space-y-2">
          <p className="font-medium text-red-600">
            {error || "Failed to load subscribers"}
          </p>

          <button
            onClick={refetch}
            className="text-sm text-blue-600 hover:underline"
          >
            Try again
          </button>
        </div>
      </TableCell>
    </TableRow>
  );

  // Empty state
  const renderEmptyState = () => (
    <TableRow>
      <TableCell colSpan={5} className="h-40 text-center">
        <p className="font-medium text-gray-900">No subscribers found</p>
        <p className="mt-1 text-sm text-gray-500">
          There are no subscribers to display.
        </p>
      </TableCell>
    </TableRow>
  );

  // Search empty state
  const renderNoSearchResults = () => (
    <TableRow>
      <TableCell colSpan={5} className="h-40 text-center">
        <p className="font-medium text-gray-900">No matching subscribers</p>
        <p className="mt-1 text-sm text-gray-500">
          Try searching with a different name, email, or IP address.
        </p>
      </TableCell>
    </TableRow>
  );

  return (
    <div className="mt-10 rounded-xl border border-gray-200 bg-white">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mt-1 text-sm text-gray-500">
            Manage your internet subscribers
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <label className="sr-only" htmlFor="search">
            Search customers
          </label>

          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

          <Input
            id="search"
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <Table className="w-full table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30%]">Customer</TableHead>
              <TableHead className="w-[20%]">IP Address</TableHead>
              <TableHead className="w-[15%]">Plan</TableHead>
              <TableHead className="w-[15%]">Status</TableHead>
              <TableHead className="w-[20%] text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading
              ? renderLoadingState()
              : error
                ? renderErrorState()
                : subscribers.length === 0
                  ? renderEmptyState()
                  : filteredCustomers.length === 0
                    ? renderNoSearchResults()
                    : filteredCustomers.map((subscriber) => (
                        <TableRow key={subscriber.id}>
                          <TableCell className="w-[30%] text-left">
                            <div>
                              <p className="font-medium">{subscriber.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {subscriber.email}
                              </p>
                            </div>
                          </TableCell>

                          <TableCell className="w-[20%] text-left font-mono text-sm">
                            {subscriber.ipAddress}
                          </TableCell>

                          <TableCell className="w-[15%] text-left">
                            {subscriber.plan}
                          </TableCell>

                          <TableCell className="w-[15%] text-left">
                            <StatusBadge status={subscriber.status} />
                          </TableCell>

                          <TableCell className="w-[20%] text-center">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <button
                                  aria-label={`Actions for ${subscriber.name}`}
                                  className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </button>
                              </DropdownMenuTrigger>

                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Pencil className="mr-2 h-4 w-4" />
                                  Edit customer
                                </DropdownMenuItem>

                                <DropdownMenuItem className="text-red-600 focus:text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete customer
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      {!isLoading && !error && subscribers.length > 0 && (
        <footer className="border-t px-5 py-4 text-sm text-gray-500">
          Showing {filteredCustomers.length} of {subscribers.length} subscribers
        </footer>
      )}
    </div>
  );
};

export default SubscribersTable;
