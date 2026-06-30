from pydantic import BaseModel


class KPI(BaseModel):
    title: str
    value: str


class DashboardResponse(BaseModel):
    kpis: list[KPI]