import Card from "./Card";

export default function LoadingCard() {
  return (
    <Card>

      <div className="animate-pulse space-y-4">

        <div className="h-6 w-1/3 rounded bg-gray-200" />

        <div className="h-4 w-full rounded bg-gray-200" />

        <div className="h-4 w-5/6 rounded bg-gray-200" />

      </div>

    </Card>
  );
}