import { useQuery } from "@tanstack/react-query";

import { getDatasetProfile } from "@/services/profile";
import { DatasetProfile } from "@/types/profile";

export function useDatasetProfile(datasetId: number) {
  return useQuery<DatasetProfile>({
    queryKey: ["profile", datasetId],
    queryFn: () => getDatasetProfile(datasetId),
    enabled: !!datasetId,
  });
}