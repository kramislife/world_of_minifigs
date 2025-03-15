import React from "react";
import TopProductsChart from "./Product/TopProductsChart";
import CategoryChart from "./Product/CategoryChart";
import CollectionChart from "./Product/CollectionChart";
import LowStockTable from "./Product/LowStockTable";

const ProductCharts = ({
  topProducts,
  categoryStats,
  collectionStats,
  lowStockProducts,
  BaseChart,
  chartColors,
}) => {
  if (!topProducts) return null;

  return (
    <>
      <div className="grid gap-5 mb-8">
        <TopProductsChart
          topProducts={topProducts}
          BaseChart={BaseChart}
          chartColors={chartColors}
        />
      </div>

      <div className="grid gap-5 mb-8 md:grid-cols-2">
        <CategoryChart
          categoryStats={categoryStats}
          BaseChart={BaseChart}
          chartColors={chartColors}
        />
        <CollectionChart
          collectionStats={collectionStats}
          BaseChart={BaseChart}
          chartColors={chartColors}
        />
      </div>

      <div className="grid gap-5 mb-8 md:grid-cols-1">
        <LowStockTable lowStockProducts={lowStockProducts} />
      </div>
    </>
  );
};

export default ProductCharts;
