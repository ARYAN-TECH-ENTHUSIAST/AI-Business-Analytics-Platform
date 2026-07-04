from app.schemas.analytics import AnalyticsSummary
from app.schemas.dataset import DatasetProfile


class ContextBuilder:

    @staticmethod
    def build(
        profile: DatasetProfile,
        analytics: AnalyticsSummary,
    ) -> str:

        return f"""
Dataset Profile

Rows: {profile.total_rows}
Columns: {profile.total_columns}
Memory Usage: {profile.memory_usage_mb:.2f} MB

Column Details

{profile.model_dump_json(indent=2)}

Analytics

{analytics.model_dump_json(indent=2)}
"""