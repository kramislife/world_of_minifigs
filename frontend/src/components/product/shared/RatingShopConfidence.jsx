import React from "react";
import { Shield, Truck, RotateCcw } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const confidenceFeatures = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Authentic Products",
    description: "100% genuine World of Minifigs parts",
  },
  {
    icon: <Truck className="w-6 h-6" />,
    title: "Fast Shipping",
    description: "Orders ship within 24 hours",
  },
  {
    icon: <RotateCcw className="w-6 h-6" />,
    title: "Easy Returns",
    description: "30-day hassle-free returns",
  },
];

const RatingShopConfidence = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center text-background">
          <Shield className="w-5 h-5 mr-2 text-accent" />
          Shop With Confidence
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {confidenceFeatures.map((feature, index) => (
          <div
            key={index}
            className="flex items-start gap-4 group transition-all"
          >
            <div className="flex-shrink-0 p-2 rounded-full bg-brand-start text-accent">
              {feature.icon}
            </div>
            <div>
              <h4 className="font-semibold text-gray-200">{feature.title}</h4>
              <p className="text-sm text-gray-400">{feature.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RatingShopConfidence;
