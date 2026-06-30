from pydantic import BaseModel, ConfigDict


class DatasetResponse(BaseModel):

    model_config = ConfigDict(
        from_attributes=True,
    )

    id: int
    name: str
    original_filename: str
    file_type: str
    file_size: int
    workspace_id: int


class DatasetPreview(BaseModel):

    columns: list[str]

    rows: list[dict]

class ColumnProfile(BaseModel):
    name: str
    dtype: str
    null_count: int
    null_percentage: float


class DatasetProfile(BaseModel):
    total_rows: int
    total_columns: int
    memory_usage_mb: float
    columns: list[ColumnProfile]

class CleaningOptions(BaseModel):
    remove_duplicates: bool = False
    drop_empty_rows: bool = False
    drop_empty_columns: bool = False