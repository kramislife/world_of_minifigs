import React from "react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/features/cartSlice";
import { setBuyNowItem } from "@/redux/features/buyNowSlice";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

const ProductActions = ({ product, onAddToCart }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);

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

  // Handle adding to cart
  const handleAddToCart = () => {
    dispatch(addToCart(formatProductForCart()));
    onAddToCart?.();
    toast.success("Added to cart successfully");
  };

  // Handle buy now
  const handleBuyNow = () => {
    if (!isAuthenticated) {
      toast.error("Please login to proceed with purchase");
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
    <div className="mt-8 flex gap-4">
      <Button
        className="flex-1 bg-red-600 hover:bg-red-700 hover:scale-105 transition-all duration-300 relative text-md"
        disabled={!product?.stock || product?.stock <= 0}
        onClick={handleAddToCart}
      >
        {product?.stock <= 0 ? "Out of Stock" : "Add to Cart"}
      </Button>
      <Button
        variant="outline"
        className="flex-1 bg-brand hover:bg-darkBrand hover:text-white hover:scale-105 transition-all duration-300 border-slate-700 text-md"
        disabled={!product?.stock || product?.stock <= 0}
        onClick={handleBuyNow}
      >
        Buy Now
      </Button>
    </div>
  );
};

export default ProductActions;
