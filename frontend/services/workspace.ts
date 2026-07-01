import api from "./api";
import {
  Workspace,
  CreateWorkspaceRequest,
} from "@/types/workspace";

export const getWorkspaces = async (): Promise<
  Workspace[]
> => {
  const response = await api.get("/workspaces");
  return response.data;
};

export const createWorkspace = async (
  data: CreateWorkspaceRequest
): Promise<Workspace> => {
  const response = await api.post(
    "/workspaces",
    data
  );

  return response.data;
};