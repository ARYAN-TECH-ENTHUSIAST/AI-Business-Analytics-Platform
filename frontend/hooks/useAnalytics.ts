import { useQuery } from "@tanstack/react-query";

import { getAnalytics } from "@/services/analytics";
import { AnalyticsSummary } from "@/types/analytics";

export function useAnalytics(
  datasetId: number
) {
  return useQuery<AnalyticsSummary>({
    queryKey: ["analytics", datasetId],
    queryFn: () => getAnalytics(datasetId),
    enabled: !!datasetId,
  });
}