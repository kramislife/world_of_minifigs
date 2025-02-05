import { ShoppingCart, Plus, Minus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  selectCartTotal,
} from "@/redux/features/cartSlice";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

const CartSheet = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [checkoutDisabled, setCheckoutDisabled] = useState(false);

  // Use the memoized selector for total
  const total = useSelector(selectCartTotal);

  // Reset checkout state when auth status changes
  useEffect(() => {
    if (isAuthenticated) {
      setShowLoginMessage(false);
      setCheckoutDisabled(false);
    }
  }, [isAuthenticated]);

  // Add debug log to check cart items structure
  console.log("Cart Items:", cartItems);

  const handleQuantityUpdate = (productId, newQuantity) => {
    if (newQuantity < 1) {
      dispatch(removeFromCart(productId));
    } else {
      dispatch(updateQuantity({ product: productId, quantity: newQuantity }));
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setShowLoginMessage(true);
      setCheckoutDisabled(true);
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsOpen(false);
    navigate("/checkout");
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

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-3 py-6 space-y-6">
              <div className="bg-darkBrand/20 rounded-2xl p-5 backdrop-blur-xl border border-white/10 shadow-lg">
                <AnimatePresence>
                  {cartItems.length === 0 ? (
                    <div className="text-center text-gray-400 py-5 text-sm">
                      <ShoppingCart
                        size={64}
                        className="mx-auto mb-10 opacity-20"
                      />
                      Oops! Your cart looks a bit lonely. Start shopping now.
                    </div>
                  ) : (
                    <ul className="space-y-6">
                      {cartItems.map((item) => (
                        <motion.li
                          key={item.product}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="flex gap-4 items-start border-b border-white/10 pb-4 last:border-0 last:pb-0"
                        >
                          {/* Product Image */}
                          <div className="relative w-32 h-32 bg-darkBrand rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                            {item.color && (
                              <div
                                className="absolute bottom-0 right-0 w-6 h-6 rounded-tl-lg border border-white/20"
                                style={{ backgroundColor: item.color }}
                                title={item.color}
                              />
                            )}
                          </div>

                          {/* Product Details */}
                          <div className="flex-1">
                            <h3 className="text-white font-medium text-lg line-clamp-1">
                              {item.name}
                            </h3>
                            {item.color && (
                              <p className="text-sm text-gray-400 mt-2">
                                Color: {item.color}
                              </p>
                            )}
                            {item.includes && (
                              <p className="text-sm text-gray-400 mt-2">
                                {item.includes.replace(/^,\s*/, "")}
                              </p>
                            )}
                            <div className="flex items-center justify-between mt-3">
                              <span className="text-emerald-400">
                                ${(item.price || 0).toFixed(2)}
                              </span>
                              <div className="flex items-center gap-2 border border-white/10 rounded-lg p-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 hover:bg-white/10"
                                  onClick={() =>
                                    handleQuantityUpdate(
                                      item.product,
                                      item.quantity - 1
                                    )
                                  }
                                >
                                  <Minus className="h-4 w-4 text-white" />
                                </Button>
                                <span className="w-8 text-center text-white">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 hover:bg-white/10"
                                  onClick={() =>
                                    handleQuantityUpdate(
                                      item.product,
                                      item.quantity + 1
                                    )
                                  }
                                >
                                  <Plus className="h-4 w-4 text-white" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Footer with Total and Checkout */}
          {cartItems.length > 0 && (
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
                  onClick={handleCheckout}
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
                      onClick={() => setIsOpen(false)}
                    >
                      login
                    </Link>
                    <span className="text-blue-400">
                      {" "}
                      to proceed with checkout
                    </span>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
