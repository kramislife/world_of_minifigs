import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CollectionChart = ({ collectionStats, BaseChart, chartColors }) => {
  const salesByCollectionData = {
    labels: collectionStats?.map((col) => col.name) || [],
    datasets: [
      {
        label: "Number of Orders",
        data: collectionStats?.map((col) => col.orderCount) || [],
        backgroundColor: [
          chartColors.primary.light,
          chartColors.secondary.light,
          chartColors.success.light,
          chartColors.warning.light,
          chartColors.danger.light,
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card className="bg-darkBrand border-none p-4 hover:bg-darkBrand/90 transition-colors">
      <CardHeader className="pb-2">
        <CardTitle className="text-light text-lg font-semibold">
          Top 5 Collections by Order Count
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <BaseChart type="bar" data={salesByCollectionData} />
      </CardContent>
    </Card>
  );
};

export default CollectionChart;
