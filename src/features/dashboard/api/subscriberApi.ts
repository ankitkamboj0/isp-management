import { mockSubscribersResponse } from "@/features/dashboard/data/MockData";

import type { SubscribersResponse } from "@/features/dashboard/types/subscriber";

const delay = (ms: number) =>

  new Promise((resolve) => setTimeout(resolve, ms));

export const subscriberApi = {

  async getSubscribers(): Promise<SubscribersResponse> {

    await delay(800);

    return mockSubscribersResponse;

  },

};