import { ShoppingCart, Plus, Minus, ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import LoadingSpinner from "@/components/layout/spinner/LoadingSpinner";
import { useCartSheet } from "@/hooks/Product/useCartSheet";
import { selectCartTotal } from "@/redux/features/cartSlice";
import { useSelector } from "react-redux";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

// A custom hook to handle the cart sheet
const CartSheet = ({ isOpen, setIsOpen }) => {
  const {
    isLoading,
    updatedCartItems,
    isAuthenticated,
    showLoginMessage,
    checkoutDisabled,
    handleQuantityUpdate,
    refetch,
  } = useCartSheet();

  const navigate = useNavigate();
  const location = useLocation();

  // Get the total price of the cart items
  const total = useSelector(selectCartTotal);

  // Refetch data when sheet is opened
  useEffect(() => {
    if (isOpen && updatedCartItems.length > 0) {
      refetch();
    }
  }, [isOpen, updatedCartItems.length, refetch]);

  // Cart Item Component
  const CartItem = ({ item, onQuantityUpdate }) => (
    <li className="flex gap-4 items-start border-b border-white/10 pb-4 last:border-0 last:pb-0">
      {/* Product Image with Fallback */}
      <div className="relative w-32 h-32 bg-darkBrand rounded-lg overflow-hidden flex-shrink-0">
        <div className="w-full h-full">
          {item.image ? (
            <>
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextElementSibling.style.display = "flex";
                }}
              />
              <div className="hidden w-full h-full items-center justify-center absolute inset-0 bg-darkBrand">
                <ImageIcon className="w-8 h-8 text-gray-500" />
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-gray-500" />
            </div>
          )}
        </div>

        {/* Discount Badge */}
        {item.discount > 0 && (
          <div className="absolute top-2 right-2 z-10">
            <Badge variant="destructive" className="text-xs">
              {item.discount}% OFF
            </Badge>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        {/* Product Name */}
        <h3 className="text-white font-medium text-lg line-clamp-1">
          {item.name}
        </h3>

        {/* Product Color */}
        <div className="h-6 mt-1">
          {item.color && <p className="text-sm text-gray-400">{item.color}</p>}
        </div>

        {/* Product Includes */}
        <div className="h-6">
          {item.includes && (
            <p className="text-sm text-gray-400 line-clamp-1">
              {item.includes.replace(/^,\s*/, "")}
            </p>
          )}
        </div>

        {/* Product Price */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">
              ${(item.discounted_price || 0).toFixed(2)}
            </span>
            {item.price && item.price > item.discounted_price && (
              <span className="text-xs text-gray-400 line-through">
                ${item.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Product Quantity Buttons */}
          <div className="flex items-center gap-2 border border-white/10 rounded-lg p-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-white/10"
              onClick={() =>
                onQuantityUpdate(item.product, item.quantity - 1, item.stock)
              }
            >
              <Minus className="h-4 w-4 text-white" />
            </Button>
            <span className="w-8 text-center text-white">{item.quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-white/10"
              onClick={() =>
                onQuantityUpdate(item.product, item.quantity + 1, item.stock)
              }
              disabled={item.quantity >= item.stock}
            >
              <Plus className="h-4 w-4 text-white" />
            </Button>
          </div>
        </div>

        {/* Maximum stock reached message */}
        {item.quantity >= item.stock && (
          <p className="text-xs text-amber-400 mt-1">Maximum stock reached</p>
        )}
      </div>
    </li>
  );

  // Cart Footer Component
  const CartFooter = ({
    total,
    onCheckout,
    showLoginMessage,
    checkoutDisabled,
    isAuthenticated,
    onClose,
  }) => (
    <div className="sticky bottom-0 px-6 py-5 bg-brand border-t border-white/10">
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-400">Total</span>
        <span className="text-emerald-400 text-xl font-semibold">
          ${total.toFixed(2)}
        </span>
      </div>

      <div className="space-y-5">
        <Button
          className="w-full flex items-center justify-center gap-2 transition-all duration-200 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onCheckout}
          disabled={checkoutDisabled}
        >
          <ShoppingCart size={18} />
          Proceed to Checkout
        </Button>
        {showLoginMessage && !isAuthenticated && (
          <p className="text-right text-sm animate-fade-in">
            <span className="text-blue-400">Please </span>
            <Link
              to="/login"
              className="underline text-blue-400 hover:text-blue-300 transition-colors"
              onClick={onClose}
            >
              login
            </Link>
            <span className="text-blue-400"> to proceed with checkout</span>
          </p>
        )}
      </div>
    </div>
  );

  const onCheckout = () => {
    if (!isAuthenticated) {
      toast.error("Please login to proceed with purchase");
      navigate("/login", {
        state: {
          from: location.pathname,
        },
      });
      return;
    }
    navigate("/checkout");
    setIsOpen(false);
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
          {/* Header */}
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

          {/* Cart Items - If there are no items in the cart, show a message, otherwise show the items */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-3 py-6 space-y-6">
              <div className="bg-darkBrand/20 rounded-2xl p-5 backdrop-blur-xl border border-white/10 shadow-lg">
                {isLoading ? (
                  <div className="flex justify-center items-center py-20">
                    <LoadingSpinner className="animate-spin" />
                  </div>
                ) : updatedCartItems.length === 0 ? (
                  <div className="text-center text-gray-400 py-5 text-sm">
                    <ShoppingCart
                      size={64}
                      className="mx-auto mb-10 opacity-20"
                    />
                    Oops! Your cart looks a bit lonely. Start shopping now.
                  </div>
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

          {/* Footer - Shows the total price of the cart items and a button to proceed to checkout */}
          {!isLoading && updatedCartItems.length > 0 && (
            <CartFooter
              total={total}
              onCheckout={onCheckout}
              showLoginMessage={showLoginMessage}
              checkoutDisabled={checkoutDisabled}
              isAuthenticated={isAuthenticated}
              onClose={() => setIsOpen(false)}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
