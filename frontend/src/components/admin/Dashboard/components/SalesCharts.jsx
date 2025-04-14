import React from "react";
import MonthlyTrendChart from "./Sales/MonthlyTrendChart";
import MonthlyComparisonChart from "./Sales/MonthlyComparisonChart";
import MonthOverMonthChart from "./Sales/MonthOverMonthChart";

const SalesCharts = ({ monthlySales, stats, BaseChart, chartColors }) => {
  if (!monthlySales || !stats) return null;

  // Get last 12 months of data
  const last12Months = monthlySales?.slice(-12) || [];
  const lastTwoMonths = last12Months.slice(-2);

  return (
    <>
      <div className="grid gap-5 grid-cols-1">
        <MonthlyTrendChart
          monthlySales={last12Months}
          BaseChart={BaseChart}
          chartColors={chartColors}
        />
        <MonthlyComparisonChart
          monthlySales={last12Months}
          BaseChart={BaseChart}
          chartColors={chartColors}
        />
          <MonthOverMonthChart
          lastTwoMonths={lastTwoMonths}
          stats={stats}
          BaseChart={BaseChart}
          chartColors={chartColors}
        />
      </div>

     
    </>
  );
};

export default SalesCharts;
