from pydantic import BaseModel


class BarChart(BaseModel):
    title: str
    labels: list[str]
    values: list[float]


class PieChart(BaseModel):
    title: str
    labels: list[str]
    values: list[float]


class ChartResponse(BaseModel):
    bar_chart: BarChart | None = None
    pie_chart: PieChart | None = None