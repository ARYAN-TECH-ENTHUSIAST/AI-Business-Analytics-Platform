from sqlalchemy.orm import Session

from app.models.dataset import Dataset


class DatasetRepository:

    def __init__(self, db: Session):
        self.db = db

    def create(
        self,
        **kwargs,
    ) -> Dataset:

        dataset = Dataset(**kwargs)

        self.db.add(dataset)
        self.db.commit()
        self.db.refresh(dataset)

        return dataset

    def get_by_id(
        self,
        dataset_id: int,
    ) -> Dataset | None:

        return (
            self.db.query(Dataset)
            .filter(Dataset.id == dataset_id)
            .first()
        )

    def get_all_by_workspace(
        self,
        workspace_id: int,
    ) -> list[Dataset]:

        return (
            self.db.query(Dataset)
            .filter(
                Dataset.workspace_id == workspace_id
            )
            .all()
        )