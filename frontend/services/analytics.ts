import api from "./api";
import { AnalyticsSummary } from "@/types/analytics";

export async function getAnalytics(
  datasetId: number
): Promise<AnalyticsSummary> {
  const response = await api.get(
    `/analytics/${datasetId}`
  );

  return response.data;
}