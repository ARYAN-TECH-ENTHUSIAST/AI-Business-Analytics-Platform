from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.user import User
from app.repositories.dataset_repository import DatasetRepository
from app.repositories.workspace_repository import WorkspaceRepository
from app.schemas.chart import ChartResponse
from app.utils.chart_generator import generate_charts
from app.utils.data_loader import load_dataframe


class ChartService:

    def __init__(self, db: Session):
        self.dataset_repository = DatasetRepository(db)
        self.workspace_repository = WorkspaceRepository(db)

    def generate(
        self,
        dataset_id: int,
        current_user: User,
    ) -> ChartResponse:

        dataset = self.dataset_repository.get_by_id(
            dataset_id
        )

        if dataset is None:
            raise HTTPException(
                status_code=404,
                detail="Dataset not found",
            )

        workspace = self.workspace_repository.get_by_id(
            dataset.workspace_id,
        )

        if workspace is None:
            raise HTTPException(
                status_code=404,
                detail="Workspace not found",
            )

        if workspace.owner_id != current_user.id:
            raise HTTPException(
                status_code=403,
                detail="Access denied",
            )

        df = load_dataframe(
            dataset.file_path,
        )

        return generate_charts(df)