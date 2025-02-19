import { ShoppingCart } from "lucide-react";

const CartHeader = () => (
  <div className="sticky top-0 px-6 py-8 border-b border-white/10">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-red-500/20 rounded-lg">
          <ShoppingCart size={20} className="text-red-400" />
        </div>
        <h2 className="text-2xl font-semibold text-white bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Shopping Cart
        </h2>
      </div>
    </div>
  </div>
);

export default CartHeader;
