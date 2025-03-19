import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Package2 } from "lucide-react";

const EmptyState = ({ title, message }) => (
  <div className="flex items-center justify-center min-h-[300px] p-4">
    <Card className="w-full max-w-md bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center gap-4">
          <div className="p-3 bg-blue-500/10 rounded-full">
            <Package2 className="w-6 h-6 text-blue-400" />
          </div>
          <div className="text-center space-y-1">
            <h3 className="font-semibold text-white">{title}</h3>
            <p className="text-sm text-gray-400">{message}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default EmptyState;
