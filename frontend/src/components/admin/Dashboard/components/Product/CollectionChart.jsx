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
    <Card className="bg-brand-dark/50 border border-brand-end/50">
      <CardHeader>
        <CardTitle className="text-white text-lg font-semibold">
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
