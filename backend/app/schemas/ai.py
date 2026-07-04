from pydantic import BaseModel


class AIInsightResponse(BaseModel):
    executive_summary: str
    key_findings: list[str]
    data_quality_issues: list[str]
    recommendations: list[str]