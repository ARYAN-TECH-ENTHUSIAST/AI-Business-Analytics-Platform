import Card from "@/components/ui/Card";

import { Workspace } from "@/types/workspace";

interface Props {
  workspace: Workspace;
}

export default function WorkspaceCard({
  workspace,
}: Props) {
  return (
    <Card>
      <h3 className="text-lg font-semibold">
        {workspace.name}
      </h3>

      <p className="mt-2 text-sm text-gray-600">
        {workspace.description ||
          "No description"}
      </p>

      <p className="mt-6 text-xs text-gray-400">
        {new Date(
          workspace.created_at
        ).toLocaleDateString()}
      </p>
    </Card>
  );
}