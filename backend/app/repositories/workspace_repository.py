from sqlalchemy.orm import Session

from app.models.workspace import Workspace


class WorkspaceRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(
        self,
        *,
        name: str,
        description: str | None,
        owner_id: int,
    ) -> Workspace:

        workspace = Workspace(
            name=name,
            description=description,
            owner_id=owner_id,
        )

        self.db.add(workspace)
        self.db.commit()
        self.db.refresh(workspace)

        return workspace

    def get_all_by_owner(
        self,
        owner_id: int,
    ) -> list[Workspace]:

        return (
            self.db.query(Workspace)
            .filter(Workspace.owner_id == owner_id)
            .all()
        )

    def get_by_id(
        self,
        workspace_id: int,
    ) -> Workspace | None:

        return (
            self.db.query(Workspace)
            .filter(Workspace.id == workspace_id)
            .first()
        )