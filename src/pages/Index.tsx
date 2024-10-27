import { useTopAssets } from "@/lib/api";
import CryptoCard from "@/components/CryptoCard";

const Index = () => {
  const { data: assets, isLoading, error } = useTopAssets();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold animate-pulse">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold text-brutal-pink">
          Error loading assets
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-6xl font-bold mb-8">
        Top Crypto
        <span className="bg-brutal-yellow px-2">Assets</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assets?.map((asset) => (
          <CryptoCard key={asset.id} asset={asset} />
        ))}
      </div>
    </div>
  );
};

export default Index;