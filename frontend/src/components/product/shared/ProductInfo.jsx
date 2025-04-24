import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { CircleCheckBig } from "lucide-react";
import StarRating from "@/components/product/shared/StarRating";
import ProductStatus from "@/components/product/shared/ProductStatus";
import ProductActions from "@/components/product/shared/ProductActions";
import { useNavigate } from "react-router-dom";

const ProductInfo = ({
  product,
  itemVariants,
  onAddToCart,
  colorVariants,
  scrollThumbnailIntoView,
  reviewStats = { averageRating: 0, totalReviews: 0 },
}) => {
  const navigate = useNavigate();

  const handleColorChange = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={itemVariants}
        key={product?._id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        {/* Title and Ratings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-2"
        >
          <h1 className="text-2xl md:text-3xl font-bold">
            {product?.product_name || "Unnamed Product"}
          </h1>

          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-300">
            {reviewStats.totalReviews > 0 && (
              <div className="flex items-center gap-1">
                <StarRating rating={Number(reviewStats.averageRating)} />
                <span className="whitespace-nowrap">
                  ({reviewStats.totalReviews}{" "}
                  {reviewStats.totalReviews === 1 ? "review" : "reviews"})
                </span>
              </div>
            )}

            {(product?.itemID || product?.partID) && (
              <>            
                <div className="flex flex-wrap items-center gap-2">
                  {product?.itemID && (
                    <span className="whitespace-nowrap">
                      Item ID: {product.itemID}
                    </span>
                  )}
                  {product?.itemID && product?.partID && (
                    <span className="text-gray-300">•</span>
                  )}
                  {product?.partID && (
                    <span className="whitespace-nowrap">
                      Part ID: {product.partID}
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* Price */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="text-4xl font-bold">
            ${(product?.discounted_price || 0).toFixed(2)}
          </span>
          {product?.discount > 0 && product?.price && (
            <span className="text-base text-gray-300 line-through">
              ${product?.price.toFixed(2)}
            </span>
          )}
        </motion.div>

        {/* Product Meta Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          {/* Availability */}
          {product?.product_availability && (
            <ProductStatus stock={product?.stock} variant="dot" />
          )}

          {/* Classifications */}
          {(product.product_category?.length > 0 ||
            product.product_collection?.length > 0) && (
            <div className="space-y-2">
              <span className="text-sm font-semibold">
                Features & Classifications
              </span>
              <div className="flex flex-wrap gap-2">
                {product?.product_category?.map((cat) => {
                  const relatedSubCategories =
                    product?.product_sub_categories?.filter(
                      (subCat) => subCat.category._id === cat._id
                    );

                  return relatedSubCategories?.length > 0
                    ? relatedSubCategories.map((subCat) => (
                        <Badge key={subCat._id} variant="subCategory">
                          {subCat.name}
                        </Badge>
                      ))
                    : (
                        <Badge key={cat._id} variant="category">
                          {cat.name}
                        </Badge>
                      );
                })}

                {product?.product_collection?.map((col) => {
                  const relatedSubCollections =
                    product?.product_sub_collections?.filter(
                      (subCol) => subCol.collection._id === col._id
                    );

                  return relatedSubCollections?.length > 0
                    ? relatedSubCollections.map((subCol) => (
                        <Badge key={subCol._id} variant="collection">
                          {subCol.name}
                        </Badge>
                      ))
                    : (
                        <Badge key={col._id} variant="subCollection">
                          {col.name}
                        </Badge>
                      );
                })}
              </div>
            </div>
          )}

          {/* Includes */}
          {product?.product_includes && (
            <div className="space-y-2">
              <span className="text-sm font-semibold">
                Bundle Details
              </span>
              <div className="flex flex-wrap gap-2">
                {product.product_includes
                  .split(",")
                  .filter((item) => item.trim())
                  .map((item, index) => (
                    <Badge key={index} variant="subCategory">
                      {item.trim()}
                    </Badge>
                  ))}
              </div>
            </div>
          )}

          {/* Color Variants */}
          {(colorVariants?.length > 0 || product?.product_color) && (
            <div className="space-y-2">
              <span className="text-sm font-semibold">
                {colorVariants?.length > 0 ? "Color Variants" : "Color"}
              </span>
              <div className="flex flex-wrap gap-2">
                {colorVariants?.length > 0
                  ? colorVariants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => {
                          handleColorChange(variant.id);
                          scrollThumbnailIntoView?.(variant.thumbnailIndex);
                        }}
                        className={`w-6 h-6 rounded-full transition-all ${
                          variant.isActive
                            ? "border-accent border-2"
                            : "border border-gray-600"
                        }`}
                        style={{ backgroundColor: variant.color.code }}
                        title={variant.color.name}
                      />
                    ))
                  : product?.product_color && (
                      <div
                        className="w-6 h-6 rounded-full border-2 border-accent"
                        style={{
                          backgroundColor: product.product_color.code,
                        }}
                        title={product.product_color.name}
                      />
                    )}
              </div>
            </div>
          )}

          {/* Descriptions */}
          {[product?.product_description_1, product?.product_description_2, product?.product_description_3]
            .filter((desc) => desc?.trim())
            .length > 0 && (
            <div className="space-y-2">
              {[product?.product_description_1, product?.product_description_2, product?.product_description_3]
                .filter((desc) => desc?.trim())
                .map((desc, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CircleCheckBig className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <p>{desc}</p>
                  </div>
                ))}
            </div>
          )}

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <ProductActions product={product} onAddToCart={onAddToCart} />
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductInfo;
