from pydantic import BaseModel


class NumericSummary(BaseModel):
    column: str
    mean: float
    median: float
    minimum: float
    maximum: float
    std: float


class AnalyticsSummary(BaseModel):
    numeric_columns: list[NumericSummary]