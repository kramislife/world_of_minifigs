import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import LoadingSpinner from "@/components/layout/spinner/LoadingSpinner";
import { ShoppingCart } from "lucide-react";
import { useCartSheet } from "@/hooks/Product/useCartSheet";
import CartHeader from "./components/CartHeader";
import CartItem from "./components/CartItem";
import CartFooter from "./components/CartFooter";

const CartSheet = ({ isOpen, setIsOpen }) => {
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
      <div className="text-center text-gray-400 py-5 text-sm">
        <ShoppingCart size={64} className="mx-auto mb-10 opacity-20" />
        Oops! Your cart looks a bit lonely. Start shopping now.
      </div>
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full bg-brand-gradient p-0 z-[1000] overflow-hidden sm:max-w-xl">
        <SheetTitle className="sr-only">Shopping Cart</SheetTitle>
        <SheetDescription className="sr-only">
          View your shopping cart items, adjust quantities, and proceed to
          checkout.
        </SheetDescription>

        <div className="h-full flex flex-col">
          <CartHeader />

          <div className="flex-1 overflow-y-auto">
            <div className="px-3 py-6 space-y-6">
              <div className="bg-darkBrand/20 rounded-2xl p-5 backdrop-blur-xl border border-white/10 shadow-lg">
                {isLoading ? (
                  <div className="flex justify-center items-center py-20">
                    <LoadingSpinner />
                  </div>
                ) : updatedCartItems.length === 0 ? (
                  <CartEmpty />
                ) : (
                  <ul className="space-y-6">
                    {updatedCartItems.map((item) => (
                      <CartItem
                        key={item.product}
                        item={item}
                        onQuantityUpdate={handleQuantityUpdate}
                      />
                    ))}
                  </ul>
                )}
              </div>
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
