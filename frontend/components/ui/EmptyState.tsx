import Card from "./Card";

interface Props {
  title: string;
  description: string;
}

export default function EmptyState({
  title,
  description,
}: Props) {
  return (
    <Card className="border-dashed text-center">

      <h3 className="text-xl font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-gray-500">
        {description}
      </p>

    </Card>
  );
}