import React from "react";
import StatCardItem from "./Stats/StatCardItem";
import { getStatCardConfig } from "@/constant/Dashboard/statCards";

const StatCards = ({ stats }) => {
  if (!stats) return null;

  const cards = getStatCardConfig(stats);

  return (
    <div className="grid gap-3 mb-5 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card, index) => (
        <StatCardItem key={index} card={card} />
      ))}
    </div>
  );
};

export default StatCards;
