import Card from "./Card";

export default function LoadingCard() {
  return (
    <Card>
      <div className="animate-pulse space-y-5">

        <div className="space-y-2">
          <div className="h-5 w-40 rounded-full bg-slate-200" />
          <div className="h-3 w-28 rounded-full bg-slate-100" />
        </div>

        <div className="space-y-3">
          <div className="h-4 w-full rounded-full bg-slate-200" />
          <div className="h-4 w-11/12 rounded-full bg-slate-200" />
          <div className="h-4 w-8/12 rounded-full bg-slate-200" />
        </div>

        <div className="flex gap-3 pt-2">
          <div className="h-9 w-24 rounded-xl bg-slate-200" />
          <div className="h-9 w-20 rounded-xl bg-slate-100" />
        </div>

      </div>
    </Card>
  );
}