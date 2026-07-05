interface Props {
  title: string;
  description?: string;
}

export default function SectionHeader({
  title,
  description,
}: Props) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900">
        {title}
      </h2>

      {description && (
        <p className="mt-1 text-gray-500">
          {description}
        </p>
      )}
    </div>
  );
}