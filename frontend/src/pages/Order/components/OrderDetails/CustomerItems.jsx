import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Package2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CustomerItems = ({ orderItems }) => {
  return (
    <Card >
      <CardHeader>
        <div className="flex items-center gap-3">
          <Package2 className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-bold text-background">Order Items</h3>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orderItems.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 border-b border-brand-end/50 rounded-lg pb-5 last:border-b-0 last:pb-0"
            >
              <div className="relative bg-brand-dark rounded-lg overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 object-cover"
                />
                {item.price > item.discountedPrice && (
                  <div className="absolute top-2 right-2 z-10">
                    <Badge className="bg-accent text-foreground">
                      {item.discount}% OFF
                    </Badge>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                  <p className="font-semibold text-md md:text-lg text-background line-clamp-1">
                    {item.name}
                  </p>
                  <p className="hidden sm:block font-bold text-lg text-emerald-400">
                    ${(item.quantity * item.discountedPrice).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center mt-1 gap-2">
                  <span className="text-sm text-gray-300">
                    ${item.discountedPrice.toFixed(2)} each
                  </span>
                  {item.price > item.discountedPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      ${item.price.toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="flex flex-col text-sm text-gray-300 space-y-1 mt-1">
                  {item.color && <span>{item.color}</span>}
                  {item.includes && (
                    <span className="line-clamp-1">{item.includes}</span>
                  )}
                  <div className="flex items-center justify-between sm:justify-start">
                    <span>Quantity: {item.quantity}</span>
                    <span className="sm:hidden font-bold text-emerald-400 text-lg">
                      ${(item.quantity * item.discountedPrice).toFixed(2)}
                    </span>
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
