import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { CircleCheckBig } from "lucide-react";
import StarRating from "./StarRating";
import ProductStatus from "./ProductStatus";
import ProductActions from "./ProductActions";

const ProductInfo = ({ product, itemVariants, onAddToCart }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={itemVariants}
        className="flex flex-col h-full"
        key={product?._id} // Add key for proper animation
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {/* Product Header Section */}
        <div className="mb-5">
          <div className="flex flex-col gap-3">
            {/* Title and Item/Part ID */}
            <motion.div
              className="flex flex-col gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h1 className="text-3xl font-bold text-white">
                {product?.product_name || "Unnamed Product"}
              </h1>
              {(product?.itemID || product?.partID) && (
                <div className="flex items-center gap-2">
                  {product?.itemID && (
                    <span className="text-sm text-gray-400">
                      Item ID: {product.itemID}
                    </span>
                  )}
                  {product?.itemID && product?.partID && (
                    <span className="text-gray-400">•</span>
                  )}
                  {product?.partID && (
                    <span className="text-sm text-gray-400">
                      Part ID: {product.partID}
                    </span>
                  )}
                </div>
              )}
            </motion.div>

            {/* Ratings Section */}
            {product?.ratings > 0 && (
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <StarRating rating={product.ratings} />
                <span className="text-gray-400 text-sm">
                  ({product.ratings})
                </span>
              </motion.div>
            )}

            {/* Price Section */}
            <motion.div
              className="flex items-center gap-4 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-2">
                <span className="text-4xl font-bold text-white">
                  ${(product?.discounted_price || 0).toFixed(2)}
                </span>
                {product?.discount > 0 && product?.price && (
                  <span className="text-md text-gray-400 line-through">
                    ${product?.price.toFixed(2)}
                  </span>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Product Details */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {/* Availability Status */}
          {product?.product_availability && (
            <ProductStatus stock={product?.stock} variant="dot" />
          )}

          {/* Product Classification Section */}
          <div className="flex flex-col gap-3">
            <span className="text-sm font-semibold text-gray-300">
              Features & Classifications
            </span>
            <div className="flex flex-wrap gap-2">
              {/* Only render badges when we have data */}
              {product && (
                <>
                  {/* Categories */}
                  {product.product_category?.map((cat) => {
                    // Find sub-categories that belong to this category
                    const relatedSubCategories =
                      product.product_sub_categories?.filter(
                        (subCat) => subCat.category._id === cat._id
                      );

                    // If there are related sub-categories, show them instead of the parent
                    if (relatedSubCategories?.length > 0) {
                      return relatedSubCategories.map((subCat) => (
                        <Badge
                          key={subCat._id}
                          variant="default"
                          className="bg-blue-600/10 text-blue-400 mt-1 hover:bg-blue-600/20 border border-blue-600/20 transition-colors duration-200 py-1.5"
                        >
                          {subCat.name}
                        </Badge>
                      ));
                    }

                    // If no sub-categories, show the parent category
                    return (
                      <Badge
                        key={cat._id}
                        variant="default"
                        className="bg-blue-600/10 text-blue-400 mt-1 hover:bg-blue-600/20 border border-blue-600/20 transition-colors duration-200 py-1.5"
                      >
                        {cat.name}
                      </Badge>
                    );
                  })}

                  {/* Collections */}
                  {product.product_collection?.map((col) => {
                    // Find sub-collections that belong to this collection
                    const relatedSubCollections =
                      product.product_sub_collections?.filter(
                        (subCol) => subCol.collection._id === col._id
                      );

                    // If there are related sub-collections, show them instead of the parent
                    if (relatedSubCollections?.length > 0) {
                      return relatedSubCollections.map((subCol) => (
                        <Badge
                          key={subCol._id}
                          variant="default"
                          className="bg-purple-600/10 text-purple-400 mt-1 hover:bg-purple-600/20 border border-purple-600/20 transition-colors duration-200 py-1.5"
                        >
                          {subCol.name}
                        </Badge>
                      ));
                    }

                    // If no sub-collections, show the parent collection
                    return (
                      <Badge
                        key={col._id}
                        variant="default"
                        className="bg-purple-600/10 text-purple-400 mt-1 hover:bg-purple-600/20 border border-purple-600/20 transition-colors duration-200 py-1.5"
                      >
                        {col.name}
                      </Badge>
                    );
                  })}
                </>
              )}
            </div>
          </div>

          {/* Includes Section */}
          {product?.product_includes && (
            <div className="flex flex-col gap-3">
              <span className="text-sm font-semibold text-gray-300 ">
                Bundle Details
              </span>
              <div className="flex flex-wrap gap-2">
                {product.product_includes
                  .split(",")
                  .filter((item) => item.trim())
                  .map((item, index) => (
                    <Badge
                      key={index}
                      variant="default"
                      className="bg-indigo-600/10 text-indigo-400 mt-1 hover:bg-indigo-600/20 border border-indigo-600/20 transition-colors duration-200 py-1.5"
                    >
                      {item.trim()}
                    </Badge>
                  ))}
              </div>
            </div>
          )}

          {/* Product Description Section */}
          <div className="space-y-4">
            {[
              product?.product_description_1,
              product?.product_description_2,
              product?.product_description_3,
            ]
              .filter((description) => description?.trim())
              .map((description, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CircleCheckBig className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-300 leading-relaxed">{description}</p>
                </div>
              ))}
          </div>

          {/* Cart Actions */}
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
