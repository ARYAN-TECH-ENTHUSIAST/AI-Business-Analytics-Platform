import { useQuery } from "@tanstack/react-query";

import { getWorkspaces } from "@/services/workspace";

export function useWorkspaces() {
  return useQuery({
    queryKey: ["workspaces"],
    queryFn: getWorkspaces,
  });
}