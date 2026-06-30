import pandas as pd

from app.schemas.chart import (
    BarChart,
    ChartResponse,
    PieChart,
)


def generate_charts(
    df: pd.DataFrame,
) -> ChartResponse:

    bar_chart = None
    pie_chart = None

    numeric = df.select_dtypes(include="number").columns
    categorical = df.select_dtypes(exclude="number").columns

    if len(categorical) > 0 and len(numeric) > 0:

        category = categorical[0]
        value = numeric[0]

        grouped = (
            df.groupby(category)[value]
            .sum()
            .head(10)
        )

        bar_chart = BarChart(
            title=f"{value} by {category}",
            labels=grouped.index.astype(str).tolist(),
            values=grouped.values.tolist(),
        )

    if len(categorical) > 0:

        category = categorical[0]

        counts = (
            df[category]
            .value_counts()
            .head(10)
        )

        pie_chart = PieChart(
            title=f"{category} Distribution",
            labels=counts.index.astype(str).tolist(),
            values=counts.values.tolist(),
        )

    return ChartResponse(
        bar_chart=bar_chart,
        pie_chart=pie_chart,
    )