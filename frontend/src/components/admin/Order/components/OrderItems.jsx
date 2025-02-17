import { Package2 } from "lucide-react";

const OrderItems = ({ orderItems }) => {
  return (
    <div className="bg-brand/80 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <Package2 className="w-6 h-6 text-blue-400" />
        <h3 className="text-xl font-bold text-white">Order Items</h3>
      </div>
      <div className="space-y-4">
        {orderItems?.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-5 bg-Brand/40 border border-gray-600/50 rounded-xl transition-all duration-200 hover:border-gray-500/50"
          >
            <div className="relative bg-blue-950 rounded-lg overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-36 h-36 object-cover transition-transform duration-300 hover:scale-105"
              />
              {item.price > item.discountedPrice && (
                <div className="absolute top-2 right-2 z-10">
                  <div className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    {Math.round(
                      ((item.price - item.discountedPrice) / item.price) * 100
                    )}
                    % OFF
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-1 min-w-0">
              <div className="flex-1">
                <p className="font-semibold text-lg text-white truncate">
                  {item.name}
                </p>
                <div className="flex flex-col text-sm text-gray-400 space-y-2 mt-2">
                  <span className="text-emerald-400">
                    ${item.discountedPrice.toFixed(2)}
                    {item.price > item.discountedPrice && (
                      <span className="text-gray-400 line-through ml-2 text-xs">
                        ${item.price.toFixed(2)}
                      </span>
                    )}
                  </span>
                  <span>Color: {item.color}</span>
                  <span>Includes: {item.includes}</span>
                  <span>Quantity: {item.quantity}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-emerald-400">
                  ${(item.quantity * item.discountedPrice).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderItems;
