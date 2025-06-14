interface PriceBoxProps {
  low: number;
  high: number;
}

export default function PriceBox({ low, high }: PriceBoxProps) {
  return (
    <div className="border rounded p-4 bg-green-50">
      <h3 className="font-semibold mb-2">Estimation de prix</h3>
      <p>
        Bas : €{low.toFixed(2)}
        <br />
        Haut : €{high.toFixed(2)}
      </p>
    </div>
  );
}
