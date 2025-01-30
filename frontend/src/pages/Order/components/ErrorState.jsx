import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const ErrorState = ({ message }) => (
  <div className="flex items-center justify-center min-h-screen">
    <Card className="w-full max-w-md bg-red-500/10 border-red-500/20">
      <CardContent className="pt-6">
        <div className="text-center text-red-400">
          Error loading orders: {message}
        </div>
      </CardContent>
    </Card>
  </div>
);

export default ErrorState;
