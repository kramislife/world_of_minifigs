import { ShoppingCart } from "lucide-react";

const CartHeader = () => (
  <div className="sticky top-0 px-3 md:px-5 py-8 border-b border-brand-end/50">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-accent rounded-lg">
          <ShoppingCart size={20} className="text-foreground" />
        </div>
        <h2 className="text-2xl font-semibold text-accent">
          Shopping Cart
        </h2>
      </div>
    </div>
  </div>
);

export default CartHeader;
