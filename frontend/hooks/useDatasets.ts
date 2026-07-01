import { useQuery } from "@tanstack/react-query";

import { getDatasets } from "@/services/dataset";

export function useDatasets(workspaceId: number) {
  return useQuery({
    queryKey: ["datasets", workspaceId],
    queryFn: () => getDatasets(workspaceId),
    enabled: !!workspaceId,
  });
}