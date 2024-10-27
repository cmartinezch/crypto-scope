import { AssetHistory } from "@/lib/api";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface PriceChartProps {
  data: AssetHistory[];
}

const PriceChart = ({ data }: PriceChartProps) => {
  const chartData = data.map((item) => ({
    time: new Date(item.time).toLocaleDateString(),
    price: parseFloat(item.priceUsd),
  }));

  return (
    <div className="h-[400px] w-full p-4 bg-white brutal-border">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <XAxis
            dataKey="time"
            stroke="#000000"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#000000"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) =>
              value.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })
            }
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#FFE800",
              border: "4px solid #000000",
              borderRadius: "0px",
              fontFamily: "Geist Mono",
            }}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#FF2E6C"
            fill="#FF2E6C"
            fillOpacity={0.2}
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;