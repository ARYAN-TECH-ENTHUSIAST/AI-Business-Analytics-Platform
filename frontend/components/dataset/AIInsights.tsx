import Card from "@/components/ui/Card";
import { AIInsightResponse } from "@/types/ai";

interface Props {
  insights: AIInsightResponse;
}

export default function AIInsights({ insights }: Props) {
  return (
    <Card>
      <div className="flex items-start justify-between border-b pb-5">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            🤖 AI Business Insights
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Generated using Google Gemini 2.5 Flash
          </p>
        </div>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
          AI Powered
        </span>
      </div>

      <div className="mt-8 space-y-8">

        <section className="rounded-xl border border-blue-100 bg-blue-50 p-6">
          <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-blue-900">
            📋 Executive Summary
          </h3>

          <p className="leading-7 text-gray-700">
            {insights.executive_summary}
          </p>
        </section>

        <section className="rounded-xl border border-green-100 bg-green-50 p-6">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-green-900">
            🔍 Key Findings
          </h3>

          <ul className="space-y-3">
            {insights.key_findings.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3"
              >
                <span className="mt-1 text-green-600">✓</span>

                <span className="leading-7 text-gray-700">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-yellow-200 bg-yellow-50 p-6">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-yellow-900">
            ⚠ Data Quality Issues
          </h3>

          <ul className="space-y-3">
            {insights.data_quality_issues.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3"
              >
                <span className="mt-1 text-yellow-600">⚠</span>

                <span className="leading-7 text-gray-700">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-emerald-100 bg-emerald-50 p-6">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-emerald-900">
            💡 Recommendations
          </h3>

          <ul className="space-y-3">
            {insights.recommendations.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3"
              >
                <span className="mt-1 text-emerald-600">✓</span>

                <span className="leading-7 text-gray-700">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </section>

      </div>
    </Card>
  );
}