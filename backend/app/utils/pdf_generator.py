from io import BytesIO
from typing import Any

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


class PDFGenerator:
    """Generates executive PDF reports."""

    @staticmethod
    def build_report(
        dataset_name: str,
        profile: Any,
        analytics: Any,
        ai_summary: str,
    ) -> BytesIO:
        buffer = BytesIO()

        doc = SimpleDocTemplate(
            buffer,
            rightMargin=0.6 * inch,
            leftMargin=0.6 * inch,
            topMargin=0.6 * inch,
            bottomMargin=0.6 * inch,
        )

        styles = getSampleStyleSheet()

        title_style = styles["Heading1"]
        title_style.alignment = TA_CENTER

        heading = styles["Heading2"]

        body = styles["BodyText"]

        story = []

        # ------------------------
        # Cover
        # ------------------------

        story.append(
            Paragraph(
                "AI Business Intelligence Report",
                title_style,
            )
        )

        story.append(Spacer(1, 0.25 * inch))

        story.append(
            Paragraph(
                f"<b>Dataset:</b> {dataset_name}",
                body,
            )
        )

        story.append(Spacer(1, 0.35 * inch))

        # ------------------------
        # Dataset Overview
        # ------------------------

        story.append(
            Paragraph(
                "Dataset Overview",
                heading,
            )
        )

        overview = Table(
            [
                ["Rows", profile.total_rows],
                ["Columns", profile.total_columns],
                [
                    "Memory Usage",
                    f"{profile.memory_usage_mb:.2f} MB",
                ],
            ],
            colWidths=[180, 180],
        )

        overview.setStyle(
            TableStyle(
                [
                    ("GRID", (0, 0), (-1, -1), 0.5, colors.grey),
                    ("BACKGROUND", (0, 0), (0, -1), colors.HexColor("#E7F8EE")),
                    ("FONTNAME", (0, 0), (-1, -1), "Helvetica"),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                ]
            )
        )

        story.append(overview)

        story.append(Spacer(1, 0.3 * inch))

        # ------------------------
        # Numeric Summary
        # ------------------------

        story.append(
            Paragraph(
                "Numeric Summary",
                heading,
            )
        )

        rows = [
            [
                "Column",
                "Mean",
                "Median",
                "Min",
                "Max",
            ]
        ]

        for column in analytics.numeric_columns:

            rows.append(
                [
                    column.column,
                    f"{column.mean:.2f}",
                    f"{column.median:.2f}",
                    f"{column.minimum:.2f}",
                    f"{column.maximum:.2f}",
                ]
            )

        analytics_table = Table(rows)

        analytics_table.setStyle(
            TableStyle(
                [
                    ("GRID", (0, 0), (-1, -1), 0.5, colors.grey),
                    ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#D9F2E6")),
                    ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                    ("BOTTOMPADDING", (0, 0), (-1, 0), 8),
                ]
            )
        )

        story.append(analytics_table)

        story.append(Spacer(1, 0.3 * inch))

        # ------------------------
        # AI Summary
        # ------------------------

        story.append(
            Paragraph(
                "Executive Summary",
                heading,
            )
        )

        story.append(
            Paragraph(
                ai_summary,
                body,
            )
        )

        doc.build(story)

        buffer.seek(0)

        return buffer