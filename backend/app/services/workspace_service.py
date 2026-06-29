from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.user import User
from app.models.workspace import Workspace
from app.repositories.workspace_repository import WorkspaceRepository
from app.schemas.workspace import WorkspaceCreate


class WorkspaceService:
    def __init__(self, db: Session):
        self.repository = WorkspaceRepository(db)

    def create_workspace(
        self,
        workspace: WorkspaceCreate,
        current_user: User,
    ) -> Workspace:

        return self.repository.create(
            name=workspace.name,
            description=workspace.description,
            owner_id=current_user.id,
        )

    def get_my_workspaces(
        self,
        current_user: User,
    ) -> list[Workspace]:

        return self.repository.get_all_by_owner(
            current_user.id
        )

    def get_workspace(
        self,
        workspace_id: int,
        current_user: User,
    ) -> Workspace:

        workspace = self.repository.get_by_id(
            workspace_id
        )

        if workspace is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Workspace not found",
            )

        if workspace.owner_id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied",
            )

        return workspace