import Card from "@/components/ui/Card";
import { AIInsightResponse } from "@/types/ai";

interface Props {
  insights: AIInsightResponse;
}

export default function AIInsights({
  insights,
}: Props) {
  return (
    <Card>
      <h2 className="mb-6 text-2xl font-semibold">
        AI Business Insights
      </h2>

      <section className="mb-6">
        <h3 className="font-semibold">
          Executive Summary
        </h3>

        <p className="mt-2 text-gray-600">
          {insights.executive_summary}
        </p>
      </section>

      <section className="mb-6">
        <h3 className="font-semibold">
          Key Findings
        </h3>

        <ul className="mt-2 list-disc space-y-2 pl-6">
          {insights.key_findings.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="font-semibold">
          Data Quality Issues
        </h3>

        <ul className="mt-2 list-disc space-y-2 pl-6">
          {insights.data_quality_issues.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="font-semibold">
          Recommendations
        </h3>

        <ul className="mt-2 list-disc space-y-2 pl-6">
          {insights.recommendations.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </Card>
  );
}