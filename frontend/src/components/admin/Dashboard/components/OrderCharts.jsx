import React from "react";
import OrderStatusChart from "./Order/OrderStatusChart";
import DailyOrdersChart from "./Order/DailyOrdersChart";

const OrderCharts = ({
  orderStatusCount,
  dailyOrders,
  BaseChart,
  chartColors,
}) => {
  if (!orderStatusCount || !dailyOrders) return null;

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <OrderStatusChart
        orderStatusCount={orderStatusCount}
        BaseChart={BaseChart}
        chartColors={chartColors}
      />
      <DailyOrdersChart
        dailyOrders={dailyOrders}
        BaseChart={BaseChart}
        chartColors={chartColors}
      />
    </div>
  );
};

export default OrderCharts;
