export interface Workspace {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
}

export interface CreateWorkspaceRequest {
  name: string;
  description?: string;
}