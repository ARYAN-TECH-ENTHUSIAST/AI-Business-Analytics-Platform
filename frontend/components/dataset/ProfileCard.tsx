import Card from "@/components/ui/Card";

interface Props {
  title: string;
  value: string | number;
}

export default function ProfileCard({
  title,
  value,
}: Props) {
  return (
    <Card className="min-h-[130px] flex flex-col justify-center">

      <div className="space-y-2">

        <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
          {title}
        </p>

        <h2 className="mt-3 text-4xl font-bold tracking-tight">
          {value}
        </h2>

      </div>

    </Card>
  );
}