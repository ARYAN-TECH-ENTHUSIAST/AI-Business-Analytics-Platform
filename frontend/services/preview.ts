import api from "./api";

export async function getDatasetPreview(
  datasetId: number
) {
  const response = await api.get(
    `/datasets/${datasetId}/preview`
  );

  return response.data;
}