import { useQuery } from "@tanstack/react-query";

import { getAIInsights } from "@/services/ai";
import { AIInsightResponse } from "@/types/ai";

export function useAI(
  datasetId: number,
  enabled: boolean,
) {
  return useQuery<AIInsightResponse>({
    queryKey: ["ai", datasetId],
    queryFn: () => getAIInsights(datasetId),
    enabled,
    retry: false,
  });
}