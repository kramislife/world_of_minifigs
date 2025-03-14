import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar } from "react-chartjs-2";
import { useGetDashboardStatsQuery } from "@/redux/api/dashboardApi";
import { Package2 } from "lucide-react";

const ProductCharts = () => {
  const { data: stats, isLoading } = useGetDashboardStatsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const topProductsData = {
    labels:
      stats?.topProducts?.map(
        (product) => `${product.name} - ${product.color_name}`
      ) || [],
    datasets: [
      {
        label: "Total Sales ($)",
        data: stats?.topProducts?.map((product) => product.totalSales) || [],
        backgroundColor: "rgba(96, 165, 250, 0.6)",
        borderColor: "#60A5FA",
        borderWidth: 1,
      },
      {
        label: "Units Sold",
        data: stats?.topProducts?.map((product) => product.quantity) || [],
        backgroundColor: "rgba(139, 92, 246, 0.6)",
        borderColor: "#8B5CF6",
        borderWidth: 1,
      },
    ],
  };

  const salesByCategoryData = {
    labels: stats?.categoryStats?.map((cat) => cat.name) || [],
    datasets: [
      {
        label: "Sales by Category",
        data: stats?.categoryStats?.map((cat) => cat.totalSales) || [],
        backgroundColor: [
          "rgba(239, 68, 68, 0.6)", // red
          "rgba(16, 185, 129, 0.6)", // green
          "rgba(245, 158, 11, 0.6)", // yellow
          "rgba(139, 92, 246, 0.6)", // purple
          "rgba(20, 184, 166, 0.6)", // teal
          "rgba(99, 102, 241, 0.6)", // indigo
          "rgba(236, 72, 153, 0.6)", // pink
          "rgba(34, 211, 238, 0.6)", // cyan
          "rgba(251, 146, 60, 0.6)", // orange
          "rgba(168, 85, 247, 0.6)", // purple
        ],
        borderWidth: 1,
      },
    ],
  };

  const salesByCollectionData = {
    labels: stats?.collectionStats?.map((col) => col.name) || [],
    datasets: [
      {
        label: "Sales by Collection",
        data: stats?.collectionStats?.map((col) => col.totalSales) || [],
        backgroundColor: [
          "rgba(99, 102, 241, 0.6)", // indigo
          "rgba(236, 72, 153, 0.6)", // pink
          "rgba(34, 211, 238, 0.6)", // cyan
          "rgba(251, 146, 60, 0.6)", // orange
          "rgba(168, 85, 247, 0.6)", // purple
          "rgba(239, 68, 68, 0.6)", // red
          "rgba(16, 185, 129, 0.6)", // green
          "rgba(245, 158, 11, 0.6)", // yellow
          "rgba(139, 92, 246, 0.6)", // violet
          "rgba(20, 184, 166, 0.6)", // teal
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "rgba(255, 255, 255, 0.1)" },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
          callback: (value) => `$${value.toLocaleString()}`,
        },
      },
      x: {
        grid: { color: "rgba(255, 255, 255, 0.1)" },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: { color: "rgba(255, 255, 255, 0.7)" },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.parsed.y;
            return `$${value.toLocaleString()}`;
          },
        },
      },
    },
  };

  const topProductsOptions = {
    ...chartOptions,
    scales: {
      ...chartOptions.scales,
      x: {
        ...chartOptions.scales.x,
        ticks: {
          ...chartOptions.scales.x.ticks,
          callback: function (value) {
            const label = this.getLabelForValue(value);
            const words = label.split(" - ");
            return words;
          },
        },
      },
    },
    plugins: {
      ...chartOptions.plugins,
      tooltip: {
        callbacks: {
          title: (context) => {
            return context[0].label;
          },
          label: (context) => {
            const label = context.dataset.label || "";
            const value = context.parsed.y;
            if (label.includes("Sales")) {
              return `${label}: $${value.toLocaleString()}`;
            }
            return `${label}: ${value.toLocaleString()}`;
          },
        },
      },
    },
  };

  return (
    <>
      <div className="grid gap-5 mb-8">
        <Card className="bg-darkBrand border-none p-4 hover:bg-darkBrand/90 transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="text-light text-lg font-semibold">
              Top 10 Selling Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Bar data={topProductsData} options={topProductsOptions} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-5 mb-8 md:grid-cols-2">
        <Card className="bg-darkBrand border-none p-4 hover:bg-darkBrand/90 transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="text-light text-lg font-semibold">
              Top 10 Categories by Sales
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <Bar data={salesByCategoryData} options={chartOptions} />
          </CardContent>
        </Card>

        <Card className="bg-darkBrand border-none p-4 hover:bg-darkBrand/90 transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="text-light text-lg font-semibold">
              Top 10 Collections by Sales
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <Bar data={salesByCollectionData} options={chartOptions} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-5 mb-8 md:grid-cols-1">
        <Card className="bg-darkBrand border-none p-4 hover:bg-darkBrand/90 transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="text-light text-lg font-semibold">
              Low Stock Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-lg border border-gray-700">
              {stats?.lowStockProducts?.length > 0 ? (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-800 text-left">
                      <th className="py-3 px-4 font-medium text-white">
                        Product
                      </th>
                      <th className="py-3 px-4 font-medium text-white">
                        Current Stock
                      </th>
                      <th className="py-3 px-4 font-medium text-white">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats?.lowStockProducts?.map((product, i) => (
                      <tr
                        key={i}
                        className="border-t border-gray-700 bg-gray-900 hover:bg-gray-800"
                      >
                        <td className="py-3 px-4 text-white">{product.name}</td>
                        <td className="py-3 px-4 text-white">
                          {product.stock} units
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                              product.stock <= 2
                                ? "bg-red-600 text-white"
                                : "bg-amber-500/80 text-white"
                            }`}
                          >
                            {product.stock <= 2 ? "Critical" : "Low"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                  <Package2 className="h-12 w-12 mb-3 opacity-50" />
                  <p className="text-sm">No products with low stock</p>
                  <p className="text-xs mt-1 opacity-75">
                    All products are well stocked
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ProductCharts;
