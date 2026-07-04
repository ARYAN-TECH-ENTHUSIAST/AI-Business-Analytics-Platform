import api from "./api";
import { AIInsightResponse } from "@/types/ai";

export async function getAIInsights(
  datasetId: number
): Promise<AIInsightResponse> {
  const response = await api.get(
    `/ai/${datasetId}`
  );

  return response.data;
}