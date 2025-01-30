import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Metadata from "@/components/layout/Metadata/Metadata";

const EmptyState = ({ title, message }) => (
  <>
    <Metadata title={title} />
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-white">{title}</h1>
      <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700">
        <CardContent className="pt-6">
          <div className="text-center text-gray-400">{message}</div>
        </CardContent>
      </Card>
    </div>
  </>
);

export default EmptyState;
