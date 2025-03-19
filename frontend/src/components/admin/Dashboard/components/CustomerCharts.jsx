import React from "react";
import CustomerDistributionChart from "./Customer/CustomerDistributionChart";
import RepeatPurchaseChart from "./Customer/RepeatPurchaseChart";

const CustomerCharts = ({ customerStats, BaseChart, chartColors }) => {
  if (!customerStats) return null;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <CustomerDistributionChart
          customerStats={customerStats}
          BaseChart={BaseChart}
          chartColors={chartColors}
        />
        <RepeatPurchaseChart
          customerStats={customerStats}
          BaseChart={BaseChart}
          chartColors={chartColors}
        />
      </div>
    </div>
  );
};

export default CustomerCharts;
