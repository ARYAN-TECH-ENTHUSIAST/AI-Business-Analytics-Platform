import api from "./api";
import { ChartResponse } from "@/types/chart";

export async function getCharts(
  datasetId: number
): Promise<ChartResponse> {
  const response = await api.get(
    `/charts/${datasetId}`
  );

  return response.data;
}