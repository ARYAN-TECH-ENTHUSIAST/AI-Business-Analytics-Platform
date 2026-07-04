import { useQuery } from "@tanstack/react-query";

import { getCharts } from "@/services/chart";
import { ChartResponse } from "@/types/chart";

export function useCharts(
  datasetId: number
) {
  return useQuery<ChartResponse>({
    queryKey: ["charts", datasetId],
    queryFn: () => getCharts(datasetId),
    enabled: !!datasetId,
  });
}