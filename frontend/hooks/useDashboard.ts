import { useQuery } from "@tanstack/react-query";

import { getDashboard } from "@/services/dashboard";
import { DashboardResponse } from "@/types/dashboard";

export function useDashboard(
  datasetId: number
) {
  return useQuery<DashboardResponse>({
    queryKey: ["dashboard", datasetId],
    queryFn: () => getDashboard(datasetId),
    enabled: !!datasetId,
  });
}