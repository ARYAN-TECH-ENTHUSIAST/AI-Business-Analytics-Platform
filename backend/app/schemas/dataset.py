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