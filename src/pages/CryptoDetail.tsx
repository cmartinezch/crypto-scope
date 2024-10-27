import { useParams } from "react-router-dom";
import { useAssetDetails, useAssetHistory } from "@/lib/api";
import PriceChart from "@/components/PriceChart";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const CryptoDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: asset, isLoading: assetLoading } = useAssetDetails(id!);
  const { data: history, isLoading: historyLoading } = useAssetHistory(id!);

  if (assetLoading || historyLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!asset || !history) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold text-brutal-pink">Asset not found</div>
      </div>
    );
  }

  const price = parseFloat(asset.priceUsd).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const marketCap = parseFloat(asset.marketCapUsd).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const change = parseFloat(asset.changePercent24Hr);

  return (
    <div className="container py-8">
      <Link
        to="/"
        className="inline-flex items-center space-x-2 mb-8 brutal-border p-2 brutal-hover bg-white"
      >
        <ArrowLeft size={24} />
        <span>Back to list</span>
      </Link>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-6xl font-bold">
            {asset.name}
            <span className="bg-brutal-yellow px-2 ml-2">{asset.symbol}</span>
          </h1>
          <div className="text-right">
            <p className="text-4xl font-mono">{price}</p>
            <p
              className={`text-xl font-mono ${
                change >= 0 ? "text-green-600" : "text-brutal-pink"
              }`}
            >
              {change >= 0 ? "+" : ""}
              {change.toFixed(2)}%
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-4 bg-white brutal-border">
            <p className="text-sm mb-1">Market Cap</p>
            <p className="text-2xl font-mono">{marketCap}</p>
          </div>
          <div className="p-4 bg-white brutal-border">
            <p className="text-sm mb-1">Rank</p>
            <p className="text-2xl font-mono">#{asset.rank}</p>
          </div>
        </div>

        <PriceChart data={history} />
      </div>
    </div>
  );
};

export default CryptoDetail;