import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { uploadDataset } from "@/services/dataset";

export function useUploadDataset() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadDataset,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          "datasets",
          variables.workspace_id,
        ],
      });
    },
  });
}