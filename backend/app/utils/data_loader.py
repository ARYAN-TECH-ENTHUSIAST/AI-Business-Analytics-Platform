from pathlib import Path

import pandas as pd


def load_dataframe(file_path: str) -> pd.DataFrame:
    extension = Path(file_path).suffix.lower()

    if extension == ".csv":
        return pd.read_csv(file_path)

    if extension in {".xlsx", ".xls"}:
        return pd.read_excel(file_path)

    raise ValueError("Unsupported file type.")