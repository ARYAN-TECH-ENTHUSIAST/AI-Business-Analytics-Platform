import api from "./api";

export async function getDatasetProfile(
  datasetId: number
) {
  const response = await api.get(
    `/datasets/${datasetId}/profile`
  );

  return response.data;
}