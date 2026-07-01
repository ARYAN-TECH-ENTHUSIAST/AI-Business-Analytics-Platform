import Card from "../ui/Card";
import { Workspace } from "@/types/workspace";

interface Props {
  workspace: Workspace;
}

export default function WorkspaceCard({
  workspace,
}: Props) {
  return (
    <Card>
      <h2 className="text-xl font-semibold">
        {workspace.name}
      </h2>

      <p className="mt-3 text-gray-600">
        {workspace.description ||
          "No description"}
      </p>

      <p className="mt-6 text-xs text-gray-400">
        Created:
        {" "}
        {new Date(
          workspace.created_at
        ).toLocaleDateString()}
      </p>
    </Card>
  );
}