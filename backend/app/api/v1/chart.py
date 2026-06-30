from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.dependencies.auth import get_current_user
from app.models.user import User
from app.schemas.chart import ChartResponse
from app.services.chart_service import ChartService

router = APIRouter(
    prefix="/charts",
    tags=["Charts"],
)


@router.get(
    "/{dataset_id}",
    response_model=ChartResponse,
)
def get_charts(
    dataset_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = ChartService(db)

    return service.generate(
        dataset_id,
        current_user,
    )