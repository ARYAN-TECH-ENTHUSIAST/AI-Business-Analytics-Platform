import Card from "@/components/ui/Card";
import { AIInsightResponse } from "@/types/ai";

interface Props {
  insights: AIInsightResponse;
}

export default function AIInsights({ insights }: Props) {
  return (
    <Card className="overflow-hidden border border-slate-200/80 shadow-sm ring-1 ring-slate-100">
      <div className="flex items-start justify-between border-b border-slate-100 pb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            🤖 AI Business Insights
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Generated using Google Gemini 2.5 Flash
          </p>
        </div>

        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          AI Powered
        </span>
      </div>

      <div className="mt-8 space-y-8">

        <section className="rounded-2xl border border-blue-100 bg-blue-50 p-6 shadow-sm">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-bold tracking-tight text-blue-900">
            📋 Executive Summary
          </h3>

          <p className="leading-8 text-gray-700">
            {insights.executive_summary}
          </p>
        </section>

        <section className="rounded-2xl border border-blue-100 bg-blue-50 p-6 shadow-sm">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-bold tracking-tight text-green-900">
            🔍 Key Findings
          </h3>

          <ul className="space-y-4">
            {insights.key_findings.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3"
              >
                <span className="mt-1 text-green-600">✓</span>

                <span className="leading-8 text-gray-700">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-blue-100 bg-blue-50 p-6 shadow-sm">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-bold tracking-tight text-yellow-900">
            ⚠ Data Quality Issues
          </h3>

          <ul className="space-y-4">
            {insights.data_quality_issues.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3"
              >
                <span className="mt-1 text-yellow-600">⚠</span>

                <span className="leading-8 text-gray-700">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-blue-100 bg-blue-50 p-6 shadow-sm">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-bold tracking-tight text-emerald-900">
            💡 Recommendations
          </h3>

          <ul className="space-y-4">
            {insights.recommendations.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3"
              >
                <span className="mt-1 text-emerald-600">✓</span>

                <span className="leading-8 text-gray-700">
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