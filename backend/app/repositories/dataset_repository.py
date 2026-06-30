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