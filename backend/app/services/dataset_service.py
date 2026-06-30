from pathlib import Path

from fastapi import HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.models.user import User
from app.repositories.dataset_repository import DatasetRepository
from app.repositories.workspace_repository import WorkspaceRepository
from app.schemas.dataset import DatasetResponse
from app.utils.file_storage import save_dataset_file
from app.schemas.dataset import DatasetPreview
from app.utils.data_loader import load_dataframe
from app.schemas.dataset import DatasetProfile
from app.utils.profiler import generate_profile

from app.schemas.dataset import CleaningOptions
from app.utils.data_cleaner import clean_dataframe
from app.utils.file_storage import (
    save_cleaned_dataframe,
)


ALLOWED_EXTENSIONS = {
    ".csv",
    ".xlsx",
    ".xls",
}


class DatasetService:

    def __init__(self, db: Session):
        self.dataset_repository = DatasetRepository(db)
        self.workspace_repository = WorkspaceRepository(db)

    def upload_dataset(
        self,
        workspace_id: int,
        file: UploadFile,
        current_user: User,
    ) -> DatasetResponse:

        workspace = self.workspace_repository.get_by_id(
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

        extension = Path(file.filename).suffix.lower()

        if extension not in ALLOWED_EXTENSIONS:
            raise HTTPException(
                status_code=400,
                detail="Only CSV and Excel files are allowed.",
            )

        file_path, original_filename = save_dataset_file(
            workspace_id,
            file,
        )

        dataset = self.dataset_repository.create(
            name=Path(original_filename).stem,
            original_filename=original_filename,
            file_path=file_path,
            file_type=extension,
            file_size=Path(file_path).stat().st_size,
            workspace_id=workspace_id,
        )

        return dataset
    
    def preview_dataset(
        self,
        dataset_id: int,
        current_user: User,
    ) -> DatasetPreview:

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

        df = load_dataframe(dataset.file_path)

        return DatasetPreview(
            columns=df.columns.tolist(),
            rows=df.head(20).to_dict(
                orient="records"
            ),
        )

    def profile_dataset(
        self,
        dataset_id: int,
        current_user: User,
    ) -> DatasetProfile:

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

        return generate_profile(df)

    def clean_dataset(
        self,
        dataset_id: int,
        options: CleaningOptions,
        current_user: User,
    ) -> DatasetResponse:

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

        cleaned_df = clean_dataframe(
            df,
            options,
        )

        cleaned_path = save_cleaned_dataframe(
            cleaned_df,
            dataset.file_path,
        )

        cleaned_dataset = self.dataset_repository.create(
            name=f"{dataset.name}_cleaned",
            original_filename=cleaned_path.split("\\")[-1],
            file_path=cleaned_path,
            file_type=dataset.file_type,
            file_size=Path(cleaned_path).stat().st_size,
            workspace_id=dataset.workspace_id,
        )

        return cleaned_dataset