import pandas as pd

from app.schemas.dashboard import (
    DashboardResponse,
    KPI,
)


def generate_dashboard(
    df: pd.DataFrame,
) -> DashboardResponse:

    total_rows = len(df)
    total_columns = len(df.columns)

    missing_values = int(
        df.isna().sum().sum()
    )

    numeric_columns = len(
        df.select_dtypes(include="number").columns
    )

    return DashboardResponse(
        kpis=[
            KPI(
                title="Rows",
                value=str(total_rows),
            ),
            KPI(
                title="Columns",
                value=str(total_columns),
            ),
            KPI(
                title="Missing Values",
                value=str(missing_values),
            ),
            KPI(
                title="Numeric Columns",
                value=str(numeric_columns),
            ),
        ]
    )