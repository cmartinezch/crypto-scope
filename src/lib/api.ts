import { useQuery } from "@tanstack/react-query";

const COINCAP_API = "https://api.coincap.io/v2";

export interface Asset {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  priceUsd: string;
  changePercent24Hr: string;
  marketCapUsd: string;
}

export interface AssetHistory {
  priceUsd: string;
  time: number;
}

export const useTopAssets = () => {
  return useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const response = await fetch(`${COINCAP_API}/assets?limit=50`);
      const data = await response.json();
      return data.data as Asset[];
    },
  });
};

export const useAssetDetails = (id: string) => {
  return useQuery({
    queryKey: ["asset", id],
    queryFn: async () => {
      const response = await fetch(`${COINCAP_API}/assets/${id}`);
      const data = await response.json();
      return data.data as Asset;
    },
  });
};

export const useAssetHistory = (id: string) => {
  return useQuery({
    queryKey: ["history", id],
    queryFn: async () => {
      const response = await fetch(
        `${COINCAP_API}/assets/${id}/history?interval=h1`
      );
      const data = await response.json();
      return data.data as AssetHistory[];
    },
  });
};