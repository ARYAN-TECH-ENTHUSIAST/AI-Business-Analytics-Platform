from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.user import User

from app.repositories.dataset_repository import DatasetRepository
from app.repositories.workspace_repository import WorkspaceRepository

from app.services.dataset_service import DatasetService
from app.services.analytics_service import AnalyticsService
from app.services.ai_service import AIService
from app.services.context_builder import ContextBuilder

from app.utils.pdf_generator import PDFGenerator


class ReportService:

    def __init__(self, db: Session):
        self.dataset_repository = DatasetRepository(db)
        self.workspace_repository = WorkspaceRepository(db)

        self.dataset_service = DatasetService(db)
        self.analytics_service = AnalyticsService(db)

    def generate_pdf_report(
        self,
        dataset_id: int,
        current_user: User,
    ):
        dataset = self.dataset_repository.get_by_id(
            dataset_id
        )

        if dataset is None:
            raise HTTPException(
                status_code=404,
                detail="Dataset not found",
            )

        workspace = self.workspace_repository.get_by_id(
            dataset.workspace_id
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

        profile = self.dataset_service.profile_dataset(
            dataset_id,
            current_user,
        )

        analytics = self.analytics_service.get_summary(
            dataset_id,
            current_user,
        )

        context = ContextBuilder.build(
            profile,
            analytics,
        )

        ai_service = AIService()

        ai_response = ai_service.generate_insights(
            context
        )

        pdf = PDFGenerator.build_report(
            dataset_name=dataset.original_filename,
            profile=profile,
            analytics=analytics,
            ai_summary=ai_response.executive_summary,
        )

        return pdf