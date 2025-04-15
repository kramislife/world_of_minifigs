import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import LoadingSpinner from "@/components/layout/spinner/LoadingSpinner";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CartHeader from "./components/CartHeader";
import CartItem from "./components/CartItem";
import CartFooter from "./components/CartFooter";
import { useCartSheet } from "@/hooks/Product/useCartSheet";
import { Button } from "@/components/ui/button";

const CartSheet = ({ isOpen, setIsOpen }) => {
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
  } = useCartSheet(isOpen, setIsOpen);

  const CartEmpty = () => {
    return (
      <div className="flex flex-col items-center justify-center text-center p-5">
        <div className="bg-brand-dark/50 rounded-full p-8 mb-6">
          <ShoppingCart size={48} className="text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">
          Your cart is empty
        </h3>
        <p className="text-gray-400 mb-6">
          Looks like you haven't added anything to your cart yet. Explore our
          top products and build up with awesome bricks!
        </p>
        <Button
          variant="buyNow"
          className="w-[200px]"
          onClick={() => {
            navigate("/products");
            setIsOpen(false);
          }}
        >
          Start Shopping
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full max-w-[400px] lg:max-w-[600px] bg-brand-start p-0">
        <SheetTitle className="sr-only">Shopping Cart</SheetTitle>
        <SheetDescription className="sr-only">
          View your shopping cart items, adjust quantities, and proceed to
          checkout.
        </SheetDescription>

        <div className="h-full flex flex-col">
          <CartHeader />

          <div className="flex-1 overflow-y-auto">
            <div className="md:p-5 px-3 py-5 space-y-5">
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
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
