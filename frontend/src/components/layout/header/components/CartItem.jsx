import { Plus, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlaceholderImage } from "@/components/product/shared/FallbackStates";

const CartItem = ({ item, onQuantityUpdate }) => {
  const quantityControls = [
    {
      Icon: Minus,
      onClick: () =>
        onQuantityUpdate(item.product, item.quantity - 1, item.stock),
      disabled: false,
    },
    {
      isQuantity: true,
    },
    {
      Icon: Plus,
      onClick: () =>
        onQuantityUpdate(item.product, item.quantity + 1, item.stock),
      disabled: item.quantity >= item.stock,
    },
  ];

  return (
    <li className="flex gap-3 items-start border-b border-brand-end/50 pb-5 last:border-0 last:pb-0">
      {/* Product Image with Fallback */}
      <div className="relative w-32 h-32 rounded-lg overflow-hidden">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <PlaceholderImage width="w-24" />
        )}

        {/* Discount Badge */}
        {item.discount > 0 && (
          <div className="absolute top-2 right-2 z-10">
            <Badge variant="accent">{item.discount}% OFF</Badge>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex-1">
        <h3 className="text-white font-medium text-lg line-clamp-1">
          {item.name}
        </h3>
        <div className="h-6 mt-1">
          <p className="text-sm text-gray-300">{item.color}</p>
        </div>
        <div className="h-6">
          <p className="text-sm text-gray-300 line-clamp-1">
            {item.includes.replace(/^,\s*/, "")}
          </p>
        </div>

        {/* Product Price */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex flex-col md:flex-row items-center md:gap-2">
            <span className="text-emerald-400 font-medium text-lg">
              ${(item.discounted_price || 0).toFixed(2)}
            </span>
            {item.price && item.price > item.discounted_price && (
              <span className="text-sm text-gray-300 line-through">
                ${item.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-2 border border-brand-end/50 rounded-lg text-white p-1">
            {quantityControls.map((control, index) =>
              control.isQuantity ? (
                <span key={index} className="w-8 text-center">
                  {item.quantity}
                </span>
              ) : (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 md:h-8 md:w-8 hover:bg-brand-end/50"
                  onClick={control.onClick}
                  disabled={control.disabled}
                >
                  <control.Icon />
                </Button>
              )
            )}
          </div>
        </div>

        {/* Stock Status */}
        {item.stock === 0 ? (
          <p className="text-xs text-red-400 mt-1">Currently out of stock</p>
        ) : (
          item.quantity >= item.stock && (
            <p className="text-xs text-accent mt-1">Maximum stock reached</p>
          )
        )}
      </div>
    </li>
  );
};

export default CartItem;
