"use client";

import { useState } from "react";

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
    <Card className="mb-8">
      <h2 className="mb-6 text-xl font-semibold">
        Create Workspace
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <Input
          label="Workspace Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          required
        />

        <Input
          label="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <Button
          type="submit"
          isLoading={createWorkspace.isPending}
        >
          Create Workspace
        </Button>
      </form>
    </Card>
  );
}