import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import LoadingSpinner from "@/components/layout/spinner/LoadingSpinner";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CartItem from "./components/CartItem";
import CartFooter from "./components/CartFooter";
import { useCartSheet } from "@/hooks/Product/useCartSheet";
import { Button } from "@/components/ui/button";

const CartSheet = () => {
  const navigate = useNavigate();
  const {
    isLoading,
    updatedCartItems,
    isAuthenticated,
    showLoginMessage,
    checkoutDisabled,
    total,
    hasOutOfStockItems,
    handleQuantityUpdate,
    handleCheckout,
  } = useCartSheet();

  const CartEmpty = () => {
    return (
      <div className="flex flex-col items-center justify-center text-center p-5">
        <div className="bg-brand-dark/50 rounded-full p-8">
          <ShoppingCart size={48} className="text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-white mt-5 mb-2">
          Your cart is empty
        </h3>
        <p className="text-gray-400 mb-6 text-sm md:text-base leading-6">
          Looks like you haven't added anything to your cart yet. Explore our
          top products and build up with awesome bricks!
        </p>
        <SheetClose asChild>
          <Button
            variant="accent"
            onClick={() => {
              navigate("/products");
            }}
          >
            Start Shopping
            <ArrowRight className="h-4 w-4" />
          </Button>
        </SheetClose>
      </div>
    );
  };

  return (
    <SheetContent>
      <SheetHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent rounded-lg">
            <ShoppingCart size={20} className="text-foreground" />
          </div>
          <SheetTitle className="m-0 sticky top-0 z-50">
            Shopping Cart
          </SheetTitle>
        </div>
        <SheetDescription className="sr-only">
          View your shopping cart items, adjust quantities, and proceed to
          checkout.
        </SheetDescription>
      </SheetHeader>

      <div className="flex-1 overflow-y-auto">
        <div className="p-5">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <LoadingSpinner height="h-full" />
            </div>
          ) : updatedCartItems.length === 0 ? (
            <CartEmpty />
          ) : (
            <div>
              <ul className="space-y-5">
                {updatedCartItems.map((item) => (
                  <CartItem
                    key={item.product}
                    item={item}
                    onQuantityUpdate={handleQuantityUpdate}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {!isLoading && updatedCartItems.length > 0 && (
        <CartFooter
          total={total}
          onCheckout={handleCheckout}
          showLoginMessage={showLoginMessage}
          checkoutDisabled={checkoutDisabled}
          isAuthenticated={isAuthenticated}
          hasOutOfStockItems={hasOutOfStockItems}
        />
      )}
    </SheetContent>
  );
};

export default CartSheet;
