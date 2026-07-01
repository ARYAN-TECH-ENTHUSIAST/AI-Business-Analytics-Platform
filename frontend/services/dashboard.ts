import api from "./api";
import { DashboardResponse } from "@/types/dashboard";

export async function getDashboard(
  datasetId: number
): Promise<DashboardResponse> {
  const response = await api.get(
    `/dashboard/${datasetId}`
  );

  return response.data;
}