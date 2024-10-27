import { Link } from "react-router-dom";
import { Asset } from "@/lib/api";

interface CryptoCardProps {
  asset: Asset;
}

const CryptoCard = ({ asset }: CryptoCardProps) => {
  const price = parseFloat(asset.priceUsd).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const change = parseFloat(asset.changePercent24Hr);

  return (
    <Link to={`/asset/${asset.id}`}>
      <div className="p-4 bg-white brutal-border brutal-hover">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold font-grotesk">{asset.name}</h2>
          <span className="text-sm font-mono bg-brutal-yellow px-2 py-1">
            {asset.symbol}
          </span>
        </div>
        <div className="font-mono">
          <p className="text-xl">{price}</p>
          <p
            className={`text-sm ${
              change >= 0 ? "text-green-600" : "text-brutal-pink"
            }`}
          >
            {change >= 0 ? "+" : ""}
            {change.toFixed(2)}%
          </p>
        </div>
        <div className="mt-2 text-sm font-mono text-gray-600">
          Rank #{asset.rank}
        </div>
      </div>
    </Link>
  );
};

export default CryptoCard;