from pathlib import Path
from uuid import uuid4

from fastapi import UploadFile

UPLOAD_DIR = Path("uploads/datasets")


def save_dataset_file(
    workspace_id: int,
    file: UploadFile,
) -> tuple[str, str]:

    dataset_folder = (
        UPLOAD_DIR
        / str(workspace_id)
        / str(uuid4())
    )

    dataset_folder.mkdir(
        parents=True,
        exist_ok=True,
    )

    file_path = dataset_folder / file.filename

    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())

    return (
        str(file_path),
        file.filename,
    )