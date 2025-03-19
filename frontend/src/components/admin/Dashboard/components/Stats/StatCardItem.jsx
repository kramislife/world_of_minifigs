import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const StatCardItem = ({ card }) => {
  const Icon = card.icon;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Card className="bg-darkBrand border-none hover:bg-darkBrand/90 transition-colors">
            <CardContent className="flex justify-between items-center p-6">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-300">
                  {card.title}
                </p>
                <p className="text-3xl font-bold text-white">{card.value}</p>
                <p className="text-xs">
                  <span className={`font-bold ${card.changeColor}`}>
                    {card.change}%{" "}
                  </span>
                  <span className="text-gray-400">{card.changeText}</span>
                </p>
              </div>
              <div className="p-3 rounded-full bg-blue-500/10">
                <Icon className={`h-8 w-8 ${card.color}`} />
              </div>
            </CardContent>
          </Card>
        </TooltipTrigger>
        {card.tooltip && (
          <TooltipContent>
            <div className="text-sm whitespace-pre-line">
              Payment Method Breakdown:
              {"\n"}
              {card.tooltip}
            </div>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default StatCardItem;
