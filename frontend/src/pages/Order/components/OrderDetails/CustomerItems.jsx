import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Package2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CustomerItems = ({ orderItems }) => {
  return (
    <Card className="bg-brand-dark/20 border border-brand-end/50">
      <CardHeader>
        <div className="flex items-center gap-3 mb-6">
          <Package2 className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-bold text-white">Order Items</h3>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orderItems.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-5 bg-Brand/40 border border-gray-600/50 rounded-xl transition-all duration-200 hover:border-gray-500/50"
            >
              <div className="relative bg-blue-950 rounded-lg overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-40 h-40 object-cover transition-transform duration-300 hover:scale-105"
                />
                {item.price > item.discountedPrice && (
                  <div className="absolute top-2 right-2 z-10">
                    <Badge className="bg-accent">
                      {item.discount}% OFF
                    </Badge>
                  </div>
                )}
              </div>
              <div className="flex flex-1 min-w-0">
                <div className="flex-1">
                  <p className="font-semibold text-lg text-white line-clamp-1">
                    {item.name}
                  </p>
                  <div className="flex flex-col text-sm text-gray-400 space-y-2 mt-2">
                  <p className="font-bold text-lg text-emerald-400">
                    ${(item.quantity * item.discountedPrice).toFixed(2)}
                  </p>
                    <span>Color: {item.color}</span>
                    <span className="line-clamp-1">Includes: {item.includes}</span>
                    <span>Quantity: {item.quantity}</span>
                  </div>
                </div>
               
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerItems;
