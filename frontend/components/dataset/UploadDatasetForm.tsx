"use client";

import { useState } from "react";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

import { useUploadDataset } from "@/hooks/useUploadDataset";

interface Props {
  workspaceId: number;
}

export default function UploadDatasetForm({
  workspaceId,
}: Props) {
  const [file, setFile] = useState<File | null>(null);

  const uploadMutation = useUploadDataset();

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const form = e.currentTarget;

    if (!file) return;

    await uploadMutation.mutateAsync({
      workspace_id: workspaceId,
      file,
    });

    setFile(null);

    form.reset();
  }

  return (
    <Card className="mb-8">
      <h2 className="mb-5 text-xl font-semibold">
        Upload Dataset
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={(e) =>
            setFile(
              e.target.files?.[0] ?? null
            )
          }
          required
        />

        <Button
          type="submit"
          isLoading={uploadMutation.isPending}
        >
          Upload Dataset
        </Button>
      </form>
    </Card>
  );
}