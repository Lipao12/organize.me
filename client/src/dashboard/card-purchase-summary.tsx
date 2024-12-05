import { TrendingDown, TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Loading } from "../(components)/loading";
import { useGetPurchaseSummaryQuery } from "../state/api";

const CardPurchaseSummary = () => {
  const user_id = { user_id: localStorage.getItem("user_id") };
  //const { data, isLoading } = useGetPurchaseSummaryQuery(user_id);
  const { data: purchaseMetrics, isLoading } =
    useGetPurchaseSummaryQuery(user_id);
  const purchaseData = purchaseMetrics?.purchase_summary || [];

  const lastDataPoint = purchaseData[purchaseData.length - 1] || null;

  return (
    <div className="flex flex-col justify-between row-span-2 xl:row-span-3 col-span-1 md:col-span-2 xl:col-span-1 bg-white shadow-md rounded-2xl">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {/* HEADER */}
          <div>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
              Resumo das Compras
            </h2>
            <hr />
          </div>

          {/* BODY */}
          <div>
            {/* BODY HEADER */}
            <div className="mb-4 mt-7 px-7">
              <p className="text-xs text-gray-400">Vendas</p>
              <div className="flex items-center">
                <p className="text-2xl font-bold">
                  {lastDataPoint
                    ? `R$
                  ${(lastDataPoint.total_purchased / 1000000).toLocaleString(
                    "pt",
                    {
                      maximumFractionDigits: 2,
                    }
                  )}
                  m`
                    : "0"}
                </p>
                {lastDataPoint && (
                  <p
                    className={`text-sm ${
                      lastDataPoint.change_percentage! >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    } flex ml-3`}
                  >
                    {lastDataPoint.change_percentage! >= 0 ? (
                      <TrendingUp className="w-5 h-5 mr-1" />
                    ) : (
                      <TrendingDown className="w-5 h-5 mr-1" />
                    )}
                    {Math.abs(lastDataPoint.change_percentage!)}%
                  </p>
                )}
              </div>
            </div>
            {/* CHART */}
            <div className="text-gray-950 ">
              <ResponsiveContainer width="100%" height={200} className="p-2">
                <AreaChart
                  data={purchaseData}
                  margin={{ top: 0, right: 0, left: -50, bottom: 45 }}
                >
                  <XAxis
                    dataKey="date"
                    tickFormatter={(date) => {
                      const parsedDate = new Date(date);
                      return parsedDate.toLocaleDateString("pt-BR", {
                        month: "short",
                      });
                    }}
                    tick={false}
                    axisLine={false}
                  />
                  <YAxis tickLine={false} tick={false} axisLine={false} />
                  <Tooltip
                    formatter={(value: number) => [
                      `R$ ${value.toLocaleString("pt-BR")}`,
                    ]}
                    labelFormatter={(label) => {
                      const date = new Date(label);
                      return date.toLocaleDateString("pt-BR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      });
                    }}
                  />
                  <Area
                    type="linear"
                    dataKey="total_purchased"
                    stroke="#8884d8"
                    fill="#8884d8"
                    dot={true}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CardPurchaseSummary;
