import WorkspaceCard from "./WorkspaceCard";
import { Workspace } from "@/types/workspace";

interface Props {
  workspaces: Workspace[];
}

export default function WorkspaceGrid({
  workspaces,
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {workspaces.map((workspace) => (
        <WorkspaceCard
          key={workspace.id}
          workspace={workspace}
        />
      ))}
    </div>
  );
}