"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import Card from "@/components/ui/Card";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <h3 className="text-sm text-gray-500">
            Workspaces
          </h3>

          <p className="mt-2 text-3xl font-bold">
            --
          </p>
        </Card>

        <Card>
          <h3 className="text-sm text-gray-500">
            Datasets
          </h3>

          <p className="mt-2 text-3xl font-bold">
            --
          </p>
        </Card>

        <Card>
          <h3 className="text-sm text-gray-500">
            Charts
          </h3>

          <p className="mt-2 text-3xl font-bold">
            --
          </p>
        </Card>

        <Card>
          <h3 className="text-sm text-gray-500">
            AI Insights
          </h3>

          <p className="mt-2 text-3xl font-bold">
            --
          </p>
        </Card>
      </div>
    </DashboardLayout>
  );
}