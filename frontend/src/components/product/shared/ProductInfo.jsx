import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { CircleCheckBig } from "lucide-react";
import StarRating from "./StarRating";
import ProductStatus from "./ProductStatus";
import ProductActions from "./ProductActions";

const ProductInfo = ({ product, itemVariants, onAddToCart }) => {
  // A function that display the product categories and collections
  const hasCategorization =
    Array.isArray(product?.product_category) ||
    Array.isArray(product?.product_collection);

  // A function that group subcategories by their parent category
  const getSubcategoriesForCategory = (categoryId) => {
    return Array.isArray(product?.product_sub_categories)
      ? product.product_sub_categories.filter(
          (subCat) => subCat.category === categoryId
        )
      : [];
  };

  // A function to group subcollections by their parent collection
  const getSubcollectionsForCollection = (collectionId) => {
    return Array.isArray(product?.product_sub_collections)
      ? product.product_sub_collections.filter(
          (subCol) => subCol.collection === collectionId
        )
      : [];
  };

  return (
    <motion.div variants={itemVariants} className="flex flex-col h-full">
      {/* Product Header Section */}
      <div className="mb-8">
        <div className="flex flex-col gap-3">
          {/* Title and Item ID */}
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-white">
              {product?.product_name || "Unnamed Product"}
            </h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">
                Item ID: {product?.itemID || "N/A"}
              </span>
              {product?.partID && (
                <>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-400">
                    Part ID: {product.partID}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Ratings Section */}
          {product?.ratings > 0 && (
            <div className="flex items-center gap-2">
              <StarRating rating={product.ratings} />
              <span className="text-gray-400 text-sm">({product.ratings})</span>
            </div>
          )}

          {/* Price Section */}
          <div className="flex items-center gap-4 mt-2">
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
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="space-y-6">
        {/* Availability Status */}
        {product?.product_availability && (
          <ProductStatus stock={product?.stock} variant="dot" />
        )}

        {/* Product Classification (Categories, Subcategories, Collections, and Subcollections) */}
        {hasCategorization &&
          Array.isArray(product?.product_category) &&
          product.product_category.length > 0 && (
            <div className="flex flex-col gap-3">
              <span className="text-sm font-medium text-gray-300">
                Product Classification
              </span>
              <div className="flex flex-wrap gap-2">
                {/* Categories with their Subcategories */}
                {product.product_category.map((category) => {
                  const subCategories = getSubcategoriesForCategory(
                    category._id
                  );
                  return (
                    <React.Fragment key={category._id}>
                      <Badge
                        variant="default"
                        className="bg-purple-600/10 text-purple-400 hover:bg-purple-600/20 border border-purple-600/20 transition-colors duration-200 py-1.5"
                      >
                        {category.name}
                      </Badge>
                      {subCategories.map((subCat) => (
                        <Badge
                          key={subCat._id}
                          variant="default"
                          className="bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 border border-blue-600/20 transition-colors duration-200 py-1.5"
                        >
                          {subCat.name}
                        </Badge>
                      ))}
                    </React.Fragment>
                  );
                })}

                {/* Collections with their Subcollections */}
                {Array.isArray(product?.product_collection) &&
                  product.product_collection.map((collection) => {
                    const subCollections = getSubcollectionsForCollection(
                      collection._id
                    );
                    return (
                      <React.Fragment key={collection._id}>
                        <Badge
                          variant="default"
                          className="bg-amber-600/10 text-amber-400 hover:bg-amber-600/20 border border-amber-600/20 transition-colors duration-200 py-1.5"
                        >
                          {collection.name}
                        </Badge>
                        {subCollections.map((subCol) => (
                          <Badge
                            key={subCol._id}
                            variant="default"
                            className="bg-green-600/10 text-green-400 hover:bg-green-600/20 border border-green-600/20 transition-colors duration-200 py-1.5"
                          >
                            {subCol.name}
                          </Badge>
                        ))}
                      </React.Fragment>
                    );
                  })}
              </div>
            </div>
          )}

        {/* Includes Section */}
        {product?.product_includes && (
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-gray-300">Includes</span>
            <div className="flex flex-wrap gap-2">
              {product.product_includes
                .split(",")
                .filter((item) => item.trim())
                .map((item, index) => (
                  <Badge
                    key={index}
                    variant="default"
                    className="bg-indigo-600/10 text-indigo-400 hover:bg-indigo-600/20 border border-indigo-600/20 transition-colors duration-200 py-1.5"
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
        <ProductActions product={product} onAddToCart={onAddToCart} />
      </div>
    </motion.div>
  );
};

export default ProductInfo;
