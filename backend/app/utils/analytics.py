import pandas as pd

from app.schemas.analytics import (
    AnalyticsSummary,
    NumericSummary,
)


def generate_numeric_summary(
    df: pd.DataFrame,
) -> AnalyticsSummary:

    summaries = []

    numeric_df = df.select_dtypes(
        include="number"
    )

    for column in numeric_df.columns:

        series = numeric_df[column]

        summaries.append(
            NumericSummary(
                column=column,
                mean=float(series.mean()),
                median=float(series.median()),
                minimum=float(series.min()),
                maximum=float(series.max()),
                std=float(series.std()),
            )
        )

    return AnalyticsSummary(
        numeric_columns=summaries,
    )