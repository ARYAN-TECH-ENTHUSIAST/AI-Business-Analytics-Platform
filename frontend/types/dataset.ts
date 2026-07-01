export interface Dataset {
  id: number;
  name: string;
  original_filename: string;
  file_type: string;
  file_size: number;
  workspace_id: number;
  created_at: string;
}

export interface UploadDatasetRequest {
  workspace_id: number;
  file: File;
}