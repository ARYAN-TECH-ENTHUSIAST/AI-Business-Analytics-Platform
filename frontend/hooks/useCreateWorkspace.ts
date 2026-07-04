import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import { createWorkspace } from "@/services/workspace";

export function useCreateWorkspace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createWorkspace,

    onSuccess: () => {
      toast.success("Workspace created");

      queryClient.invalidateQueries({
        queryKey: ["workspaces"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.detail ??
          "Unable to create workspace."
      );
    },
  });
}