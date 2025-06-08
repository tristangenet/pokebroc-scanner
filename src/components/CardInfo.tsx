interface CardInfoProps {
  name: string;
  set: string;
  number: string;
}

export default function CardInfo({ name, set, number }: CardInfoProps) {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="font-semibold text-lg mb-1">{name}</h2>
      <p className="text-sm">Set : {set}</p>
      <p className="text-sm"># {number}</p>
    </div>
  );
}
