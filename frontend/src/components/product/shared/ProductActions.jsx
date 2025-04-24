import React from "react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/features/cartSlice";
import { setBuyNowItem } from "@/redux/features/buyNowSlice";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import CartSheet from "@/components/layout/header/CartSheet";

const ProductActions = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const formatProductForCart = () => ({
    product: product._id,
    name: product.product_name,
    discounted_price: product.discounted_price || product.price,
    price: product.price,
    discount: product.discount,
    image: product.product_images[0]?.url,
    quantity: 1,
    stock: product.stock,
    color: product.product_color?.name || null,
    includes: product.product_includes || "",
  });

  // Check if adding to cart would exceed stock
  const checkStockAvailability = () => {
    const existingItem = cartItems.find((item) => item.product === product._id);
    if (existingItem) {
      if (existingItem.quantity >= product.stock) {
        toast.error(`Maximum stock limit reached (${product.stock} items)`);
        return false;
      }
    }
    return true;
  };

  // Handle adding to cart
  const handleAddToCart = () => {
    if (!checkStockAvailability()) {
      return;
    }
    dispatch(addToCart(formatProductForCart()));
    toast.success("Added to cart successfully");
  };

  // Handle buy now
  const handleBuyNow = () => {
    if (!isAuthenticated) {
      toast.info("Please login to proceed with purchase");
      navigate("/login", {
        state: {
          from: location.pathname,
          returnTo: "product",
        },
      });
      return;
    }
    dispatch(setBuyNowItem(formatProductForCart()));
    navigate("/checkout?mode=buy_now");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant={product?.stock <= 0 ? "destructive" : "cart"}
            className="w-full"
            disabled={!product?.stock || product?.stock <= 0}
            onClick={handleAddToCart}
          >
            {product?.stock <= 0 ? "Out of Stock" : "Add to Cart"}
          </Button>
        </SheetTrigger>
        <CartSheet />
      </Sheet>
      <Button
        variant="accent"
        className="w-full"
        disabled={!product?.stock || product?.stock <= 0}
        onClick={handleBuyNow}
      >
        Buy Now
      </Button>
    </div>
  );
};

export default ProductActions;
