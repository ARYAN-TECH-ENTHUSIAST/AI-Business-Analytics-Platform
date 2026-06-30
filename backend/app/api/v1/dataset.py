from fastapi import (
    APIRouter,
    Depends,
    File,
    UploadFile,
)

from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.dependencies.auth import get_current_user
from app.models.user import User
from app.services.dataset_service import DatasetService
from app.schemas.dataset import (
    CleaningOptions,
    DatasetPreview,
    DatasetProfile,
    DatasetResponse,
)

router = APIRouter(
    prefix="/datasets",
    tags=["Datasets"],
)


@router.post(
    "/upload/{workspace_id}",
    response_model=DatasetResponse,
    status_code=201,
)
def upload_dataset(
    workspace_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    service = DatasetService(db)

    return service.upload_dataset(
        workspace_id,
        file,
        current_user,
    )

@router.get(
    "/{dataset_id}/preview",
    response_model=DatasetPreview,
)
def preview_dataset(
    dataset_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    service = DatasetService(db)

    return service.preview_dataset(
        dataset_id,
        current_user,
    )

@router.get(
    "/{dataset_id}/profile",
    response_model=DatasetProfile,
)
def profile_dataset(
    dataset_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    service = DatasetService(db)

    return service.profile_dataset(
        dataset_id,
        current_user,
    )

@router.post(
    "/{dataset_id}/clean",
    response_model=DatasetResponse,
)
def clean_dataset(
    dataset_id: int,
    options: CleaningOptions,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    service = DatasetService(db)

    return service.clean_dataset(
        dataset_id,
        options,
        current_user,
    )