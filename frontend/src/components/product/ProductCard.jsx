import React from "react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ImageIcon } from "lucide-react";
import StarRating from "@/components/product/shared/StarRating";
import ProductStatus from "@/components/product/shared/ProductStatus";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const hasImages =
    product?.product_images && product.product_images.length > 0;

  const PlaceholderImage = () => (
    <div className="w-full h-full bg-brand-gradient flex items-center justify-center">
      <ImageIcon className="w-16 h-16 text-slate-500" />
    </div>
  );

  const handleViewDetails = () => {
    if (category) {
      navigate(`/products/${category}/${product?._id}`);
    } else {
      navigate(`/products/${product?._id}`);
    }
  };

  const discountedPrice =
    product?.price && product?.discount
      ? product.price - (product.price * product.discount) / 100
      : product?.price || 0;

  return (
    <motion.div
      onClick={handleViewDetails}
      className="bg-brand-gradient/80 text-slate-100 border border-slate-700 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-100 group relative cursor-pointer"
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      {/* Discount Badge */}
      {product?.discount > 0 && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-gradient-to-r from-red-700 to-red-500 px-3 py-1.5 rounded-full text-sm font-medium shadow-lg">
            {product.discount}% OFF
          </div>
        </div>
      )}

      {/* Product Image */}
      <div className="relative overflow-hidden aspect-square">
        {hasImages ? (
          <img
            src={product.product_images[0].url}
            alt={product.product_name || "Product Image"}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <PlaceholderImage />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <button
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-2.5 rounded-full font-medium shadow-lg transition-all duration-300 ease-out pointer-events-none"
        >
          View Details
        </button>
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col gap-5">
        {/* Product Name */}
        <h3 className="text-lg font-semibold transition-colors line-clamp-1">
          {product?.product_name || "Unnamed Product"}
        </h3>

        {/* Categories */}
        {/* <div className="flex flex-wrap gap-1">
          {product?.product_category?.length > 0 ? (
            product.product_category.map((category, index) => (
              <span
                key={index}
                className="text-xs px-2.5 py-1 rounded-full border bg-blue-500/20 text-blue-400 border-blue-500/10 transition-colors duration-300"
              >
                {category.name}
              </span>
            ))
          ) : (
            <span className="text-xs px-2.5 py-1 rounded-full border text-gray-500 border-gray-500/20 capitalize transition-colors duration-300">
              No categories
            </span>
          )}
        </div> */}

        {/* Pricing and Ratings */}
        <div className="flex flex-col gap-3 mt-auto">
          {/* Pricing */}
          <div className="flex items-baseline justify-between">
            {product?.price ? (
              <>
                <p className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                  ${discountedPrice.toFixed(2)}
                </p>
                {product?.discount > 0 && (
                  <p className="text-sm text-slate-500 line-through">
                    ${product.price.toFixed(2)}
                  </p>
                )}
              </>
            ) : (
              <p className="text-sm text-slate-500">$0.00</p>
            )}
          </div>

          {/* Ratings */}
          <div className="flex justify-between items-center pt-2">
            <div className="flex items-center gap-2">
              <StarRating rating={product?.ratings || 0} />
              <span className="text-sm text-slate-300/70">
                ({product?.reviews?.length || 0})
              </span>
            </div>

            {/* Stock Status */}
            {/* <div className="flex items-center h-6">
              {product?.product_category?.length > 0 ? (
                <span className="text-sm bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full">
                  {product.product_category.map((col) => col.name).join(", ")}
                </span>
              ) : (
                <span className="text-sm text-slate-500">No collection</span>
              )}
              <ProductStatus stock={product?.stock} />
            </div> */}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
