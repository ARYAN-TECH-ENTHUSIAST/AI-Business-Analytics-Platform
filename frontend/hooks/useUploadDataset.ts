import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import { uploadDataset } from "@/services/dataset";

export function useUploadDataset() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadDataset,

    onSuccess: (_, variables) => {
      toast.success("Dataset uploaded");

      queryClient.invalidateQueries({
        queryKey: [
          "datasets",
          variables.workspace_id,
        ],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.detail ??
          "Dataset upload failed."
      );
    },
  });
}