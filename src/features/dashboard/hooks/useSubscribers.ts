import { useContext } from "react";
import { SubscribersContext } from "@/features/dashboard/context/SubscribersContext";

export const useSubscribers = () => {
  const context = useContext(SubscribersContext);

  if (!context) {
    throw new Error("useSubscribers must be used within a SubscribersProvider");
  }

  return context;
};
