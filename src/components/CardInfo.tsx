interface CardInfoProps {
  name: string;
  set: string;
  number: string;
  image: string;
  rarity: string;
}

export default function CardInfo({ name, set, number, image, rarity }: CardInfoProps) {
  return (
    <div className="border p-4 rounded shadow space-y-2">
      <img src={image} alt={name} className="w-32 mx-auto" />
      <h2 className="font-semibold text-lg">{name}</h2>
      <p className="text-sm">Série : {set}</p>
      <p className="text-sm"># {number}</p>
      <p className="text-sm">Rareté : {rarity}</p>
    </div>
  );
}
