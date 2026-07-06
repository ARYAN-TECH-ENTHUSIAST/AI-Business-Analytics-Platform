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

export async function downloadPDFReport(
  datasetId: number
): Promise<void> {
  const response = await api.get(
    `/reports/${datasetId}/pdf`,
    {
      responseType: "blob",
    }
  );

  const blob = new Blob(
    [response.data],
    {
      type: "application/pdf",
    }
  );

  const url =
    window.URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.download =
    `dataset_${datasetId}_report.pdf`;

  document.body.appendChild(link);

  link.click();

  link.remove();

  window.URL.revokeObjectURL(url);
}