import api from "./api";
import {
  Dataset,
  UploadDatasetRequest,
} from "@/types/dataset";

export async function getDatasets(
  workspaceId: number
): Promise<Dataset[]> {
  const response = await api.get(
    `/datasets/workspace/${workspaceId}`
  );

  return response.data;
}

export async function uploadDataset({
  workspace_id,
  file,
}: UploadDatasetRequest): Promise<Dataset> {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(
    `/datasets/upload/${workspace_id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}