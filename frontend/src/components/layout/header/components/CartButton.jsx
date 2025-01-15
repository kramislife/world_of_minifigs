import { ShoppingCart } from "lucide-react";

const CartButton = ({ itemCount = 0, onClick }) => {
  return (
    <button
      className="text-white hover:text-gray-200 relative"
      onClick={onClick}
    >
      <ShoppingCart size={24} />

      {/* Counter Badge - Shows total quantity of all items */}
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
        {itemCount}
      </span>
    </button>
  );
};

export default CartButton;
