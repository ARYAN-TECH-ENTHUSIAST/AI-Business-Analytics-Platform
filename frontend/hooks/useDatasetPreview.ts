import { useQuery } from "@tanstack/react-query";

import { getDatasetPreview } from "@/services/preview";

export function useDatasetPreview(
  datasetId: number
) {
  return useQuery({
    queryKey: ["preview", datasetId],
    queryFn: () => getDatasetPreview(datasetId),
    enabled: !!datasetId,
  });
}