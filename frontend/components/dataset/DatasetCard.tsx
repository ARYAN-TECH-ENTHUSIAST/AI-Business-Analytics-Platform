"use client";

import Link from "next/link";

import Card from "@/components/ui/Card";
import { Dataset } from "@/types/dataset";

interface Props {
  dataset: Dataset;
}

export default function DatasetCard({
  dataset,
}: Props) {
  return (
    <Link href={`/datasets/${dataset.id}`}>
      <Card className="cursor-pointer transition hover:shadow-md">
        <h3 className="text-lg font-semibold">
          {dataset.name}
        </h3>

        <p className="mt-2 text-sm text-gray-600">
          {dataset.original_filename}
        </p>

        <div className="mt-5 flex justify-between text-sm text-gray-500">
          <span>{dataset.file_type}</span>

          <span>
            {(dataset.file_size / 1024).toFixed(1)} KB
          </span>
        </div>
      </Card>
    </Link>
  );
}