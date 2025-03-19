import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

const ErrorState = ({ message }) => (
  <div className="flex items-center justify-center min-h-[300px]">
    <Card className="w-full max-w-md bg-red-950/20 border-red-500/20 backdrop-blur-sm">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center gap-4">
          <div className="p-3 bg-red-500/10 rounded-full">
            <AlertCircle className="w-6 h-6 text-red-500" />
          </div>
          <div className="text-center space-y-1">
            <h3 className="font-semibold text-red-400">Error Loading Orders</h3>
            <p className="text-sm text-red-400/80">{message}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default ErrorState;
