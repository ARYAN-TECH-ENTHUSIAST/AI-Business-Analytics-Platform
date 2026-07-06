"use client";

import { useState } from "react";
import { FolderPlus } from "lucide-react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";

import { useCreateWorkspace } from "@/hooks/useCreateWorkspace";

export default function CreateWorkspaceForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const createWorkspace = useCreateWorkspace();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!name.trim()) return;

    await createWorkspace.mutateAsync({
      name,
      description,
    });

    setName("");
    setDescription("");
  };

  return (
    <Card className="rounded-[22px]">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Create Workspace
          </h2>

          <p className="mt-2 text-slate-500">
            Organize datasets, dashboards and AI analysis into a dedicated workspace.
          </p>
        </div>

        <div className="rounded-2xl bg-emerald-100 p-3">
          <FolderPlus
            size={24}
            className="text-emerald-700"
          />
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <Input
          label="Workspace Name"
          placeholder="Sales Analytics"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Input
          label="Description"
          placeholder="Monthly sales reports and forecasting"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="pt-2">
          <Button
            type="submit"
            isLoading={createWorkspace.isPending}
          >
            <FolderPlus size={18} />
            Create Workspace
          </Button>
        </div>
      </form>
    </Card>
  );
}