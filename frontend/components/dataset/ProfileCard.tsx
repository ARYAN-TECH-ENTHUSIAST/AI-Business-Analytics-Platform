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
    <Card>
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h2 className="mt-2 text-3xl font-bold">
        {value}
      </h2>
    </Card>
  );
}