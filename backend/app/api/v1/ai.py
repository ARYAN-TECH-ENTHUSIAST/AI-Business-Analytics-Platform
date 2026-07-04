# API
#    ↓
# Service
#    ↓
# OpenAI

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.dependencies.auth import get_current_user
from app.models.user import User

from app.schemas.ai import AIInsightResponse

from app.services.ai_service import AIService
from app.services.dataset_service import DatasetService
from app.services.analytics_service import AnalyticsService

from app.services.context_builder import ContextBuilder


router = APIRouter(
    prefix="/ai",
    tags=["AI"],
)


@router.get(
    "/{dataset_id}",
    response_model=AIInsightResponse,
)
def generate_ai_insights(
    dataset_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    dataset_service = DatasetService(db)
    analytics_service = AnalyticsService(db)

    profile = dataset_service.profile_dataset(
        dataset_id,
        current_user,
    )

    analytics = analytics_service.get_summary(
        dataset_id,
        current_user,
    )

    context = ContextBuilder.build(
        profile,
        analytics,
    )

    ai_service = AIService()

    return ai_service.generate_insights(
        context
    )