import React from "react";
import CustomerDistributionChart from "./Customer/CustomerDistributionChart";
import RepeatPurchaseChart from "./Customer/RepeatPurchaseChart";

const CustomerCharts = ({ customerStats, BaseChart, chartColors }) => {
  if (!customerStats) return null;

  return (
    <div className="grid gap-5 md:grid-cols-2">
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
  );
};

export default CustomerCharts;
