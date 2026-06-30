import pandas as pd

from app.schemas.dataset import CleaningOptions


def clean_dataframe(
    df: pd.DataFrame,
    options: CleaningOptions,
) -> pd.DataFrame:

    cleaned_df = df.copy()

    if options.remove_duplicates:
        cleaned_df = cleaned_df.drop_duplicates()

    if options.drop_empty_rows:
        cleaned_df = cleaned_df.dropna(
            axis=0,
            how="all",
        )

    if options.drop_empty_columns:
        cleaned_df = cleaned_df.dropna(
            axis=1,
            how="all",
        )

    return cleaned_df