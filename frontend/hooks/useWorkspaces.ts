import { useQuery } from "@tanstack/react-query";

import {
  getWorkspace,
  getWorkspaces,
} from "@/services/workspace";

export function useWorkspaces() {
  return useQuery({
    queryKey: ["workspaces"],
    queryFn: getWorkspaces,
  });
}

export function useWorkspace(
  workspaceId: number
) {
  return useQuery({
    queryKey: ["workspace", workspaceId],
    queryFn: () => getWorkspace(workspaceId),
    enabled: !!workspaceId,
  });
}