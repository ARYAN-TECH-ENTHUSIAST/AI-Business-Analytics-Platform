import pandas as pd

from app.schemas.dataset import (
    ColumnProfile,
    DatasetProfile,
)


def generate_profile(
    df: pd.DataFrame,
) -> DatasetProfile:

    total_rows = len(df)

    columns = []

    for column in df.columns:

        null_count = int(
            df[column].isna().sum()
        )

        percentage = (
            0.0
            if total_rows == 0
            else round(
                null_count * 100 / total_rows,
                2,
            )
        )

        columns.append(
            ColumnProfile(
                name=column,
                dtype=str(df[column].dtype),
                null_count=null_count,
                null_percentage=percentage,
            )
        )

    memory = round(
        df.memory_usage(deep=True).sum()
        / 1024
        / 1024,
        2,
    )

    return DatasetProfile(
        total_rows=total_rows,
        total_columns=len(df.columns),
        memory_usage_mb=memory,
        columns=columns,
    )