import React, { useState, useRef, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight, CircleCheckBig } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Metadata from "@/components/layout/Metadata/Metadata";
import StarRating from "@/components/product/shared/StarRating";
import ProductStatus from "@/components/product/shared/ProductStatus";
import {
  ProductImagePlaceholder,
  ProductThumbnailPlaceholder,
} from "@/components/product/shared/FallbackStates";
import CartSheet from "@/components/layout/header/components/CartSheet";
import { addToCart } from "@/redux/features/cartSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Badge } from "@/components/ui/badge";

const ProductDetails = ({
  product,
  similarProducts,
  containerVariants,
  itemVariants,
}) => {
  const dispatch = useDispatch();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentProduct, setCurrentProduct] = useState(product);
  const thumbnailContainerRef = useRef(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const buttonRef = useRef(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    console.log("PRODUCT:", product);
  }, []);

  // Determine what to display based on similarProducts prop
  const displayItems = useMemo(() => {
    if (similarProducts) {
      // Filter similar products to only include those with the same partID
      return similarProducts.filter((item) => item.partID === product.partID);
    }
    return product?.product_images?.length > 0
      ? product.product_images
      : [{ url: product?.product_images?.[0]?.url }];
  }, [similarProducts, product]);

  // Update current product when navigating
  useEffect(() => {
    if (similarProducts) {
      setCurrentProduct(displayItems[currentImageIndex]);
    } else {
      setCurrentProduct(product);
    }
  }, [currentImageIndex, similarProducts, product, displayItems]);

  // Update scrollIntoView helper
  const scrollThumbnailIntoView = (index) => {
    if (!thumbnailContainerRef.current) return;
    const container = thumbnailContainerRef.current;
    const thumbnails = container.children[0].children;

    if (thumbnails[index]) {
      // For the first image, scroll to the start
      if (index === 0) {
        container.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      } else {
        thumbnails[index].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "nearest",
        });
      }
    }
  };

  // Navigation functions
  const nextImage = () => {
    const newIndex =
      currentImageIndex === displayItems.length - 1 ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
    scrollThumbnailIntoView(newIndex);
  };

  const prevImage = () => {
    const newIndex =
      currentImageIndex === 0 ? displayItems.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
    scrollThumbnailIntoView(newIndex);
  };

  // Handle add to cart with animation
  const handleAddToCart = () => {
    const itemToAdd = {
      product: currentProduct._id,
      name: currentProduct.product_name,
      price: currentProduct.price * (1 - (currentProduct.discount || 0) / 100),
      image: currentProduct.product_images[0]?.url,
      quantity: 1,
      stock: currentProduct.stock,
      color: currentProduct.product_color?.name || null,
      includes: currentProduct.product_includes || ''
    };

    console.log('Adding to cart:', itemToAdd);

    dispatch(addToCart(itemToAdd));
    setIsCartOpen(true);
  };

  return (
    <>
      <Metadata title={currentProduct?.product_name || "Product Details"} />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto px-4 py-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Gallery Section */}
          <motion.div
            variants={itemVariants}
            className="relative flex flex-col-reverse md:flex-row gap-4 h-fit"
          >
            {/* Thumbnails */}
            <div className="w-full md:w-[150px] md:h-[570px] relative">
              <div
                className="w-full h-full overflow-y-auto no-scrollbar"
                ref={thumbnailContainerRef}
              >
                <div className="flex flex-row md:flex-col gap-2">
                  {displayItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className="group relative min-w-[130px] max-w-[130px] md:min-w-0 md:max-w-full aspect-square"
                    >
                      {/* Image Container */}
                      <div
                        className={`w-full h-full rounded-lg overflow-hidden border-2 transition-all ${
                          currentImageIndex === index
                            ? "border-red-600 border-4"
                            : "border border-slate-700"
                        }`}
                      >
                        <img
                          src={
                            similarProducts
                              ? item.product_images[0]?.url
                              : item.url
                          }
                          alt={
                            similarProducts
                              ? `${item.product_name}`
                              : `${product.product_name} view ${index + 1}`
                          }
                          className="w-full h-full object-fill transition-transform duration-300"
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Image Display */}
            <div className="flex-1 relative bg-blue-950 rounded-lg overflow-hidden aspect-square">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={
                    similarProducts
                      ? currentProduct?.product_images[0]?.url
                      : product.product_images[currentImageIndex]?.url
                  }
                  alt={currentProduct?.product_name}
                  className="w-full h-full object-fill"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>

              {displayItems.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70"
                    onClick={nextImage}
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </Button>
                </>
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div variants={itemVariants} className="flex flex-col h-full">
            {/* Product Header Section */}
            <div className="mb-8">
              <div className="flex flex-col gap-3">
                {/* Title and Item ID */}
                <div className="flex flex-col gap-2">
                  <h1 className="text-3xl font-bold text-white">
                    {currentProduct?.product_name || "Unnamed Product"}
                  </h1>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">
                      Item ID: {currentProduct?.itemID || "N/A"}
                    </span>
                    {currentProduct?.partID && (
                      <>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-400">
                          Part ID: {currentProduct.partID}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Ratings Section */}
                <div className="flex items-center gap-3">
                  {currentProduct?.ratings > 0 && (
                    <div className="flex items-center gap-2">
                      <StarRating rating={currentProduct.ratings} />
                      <span className="text-gray-400 text-sm">
                        ({currentProduct.ratings})
                      </span>
                    </div>
                  )}
                </div>

                {/* Price Section with Enhanced Styling */}
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex  items-center gap-2">
                    <span className="text-4xl font-bold text-white">
                      $
                      {(
                        (currentProduct?.price || 0) *
                        (1 - (currentProduct?.discount || 0) / 100)
                      ).toFixed(2)}
                    </span>
                    {currentProduct?.discount > 0 && (
                      <span className="text-md text-gray-400 line-through">
                        ${(currentProduct?.price || 0).toFixed(2)}
                      </span>
                    )}
                    {currentProduct?.discount > 0 && (
                      <Badge
                        variant="destructive"
                        className="bg-red-500 hover:bg-red-600 mt-1"
                      >
                        {currentProduct.discount}% OFF
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details Section */}
            <div className="space-y-6">
              {/* Availability Status */}
              {currentProduct?.product_availability && (
                <div className="flex items-center gap-3">
                  <ProductStatus stock={currentProduct?.stock} variant="dot" />
                  {currentProduct?.pre_order &&
                    currentProduct?.release_date && (
                      <span className="text-gray-400 text-sm">
                        Available{" "}
                        {new Date(
                          currentProduct.release_date
                        ).toLocaleDateString()}
                      </span>
                    )}
                </div>
              )}

              {/* Categories & Collections */}
              {((Array.isArray(currentProduct?.product_category) &&
                currentProduct.product_category.length > 0) ||
                (Array.isArray(currentProduct?.product_collection) &&
                  currentProduct.product_collection.length > 0)) && (
                <div className="flex flex-col gap-3">
                  <span className="text-sm font-medium text-gray-300">
                    Categories & Collections
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {/* Categories and Subcategories */}
                    {Array.isArray(currentProduct?.product_category) &&
                      currentProduct.product_category.map((category, index) => {
                        const categorySubItems = Array.isArray(
                          currentProduct?.product_sub_categories
                        )
                          ? currentProduct.product_sub_categories.filter(
                              (subCat) => subCat.category === category._id
                            )
                          : [];

                        return (
                          <div
                            key={`cat-${index}`}
                            className="flex flex-wrap gap-2"
                          >
                            {categorySubItems.length > 0 ? (
                              categorySubItems.map((subCat, subIndex) => (
                                <Badge
                                  key={`subcat-${subIndex}`}
                                  variant="default"
                                  className="bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 border border-blue-600/20 transition-colors duration-200 py-1.5"
                                >
                                  {subCat?.name}
                                </Badge>
                              ))
                            ) : (
                              <Badge
                                variant="default"
                                className="bg-purple-600/10 text-purple-400 hover:bg-purple-600/20 border border-purple-600/20 transition-colors duration-200"
                              >
                                {category?.name}
                              </Badge>
                            )}
                          </div>
                        );
                      })}

                    {/* Collections and Subcollections */}
                    {Array.isArray(currentProduct?.product_collection) &&
                      currentProduct.product_collection.map(
                        (collection, index) => {
                          const collectionSubItems = Array.isArray(
                            currentProduct?.product_sub_collections
                          )
                            ? currentProduct.product_sub_collections.filter(
                                (subCol) => subCol.collection === collection._id
                              )
                            : [];

                          return (
                            <div
                              key={`col-${index}`}
                              className="flex flex-wrap gap-2"
                            >
                              {collectionSubItems.length > 0 ? (
                                collectionSubItems.map((subCol, subIndex) => (
                                  <Badge
                                    key={`subcol-${subIndex}`}
                                    variant="default"
                                    className="bg-green-600/10 text-green-400 hover:bg-green-600/20 border border-green-600/20 transition-colors duration-200 py-1.5"
                                  >
                                    {subCol?.name}
                                  </Badge>
                                ))
                              ) : (
                                <Badge
                                  variant="default"
                                  className="bg-amber-600/10 text-amber-400 hover:bg-amber-600/20 border border-amber-600/20 transition-colors duration-200 py-1.5"
                                >
                                  {collection?.name}
                                </Badge>
                              )}
                            </div>
                          );
                        }
                      )}
                  </div>
                </div>
              )}

              {/* Includes Section */}
              {currentProduct?.product_includes && (
                <div className="flex flex-col gap-3">
                  <span className="text-sm font-medium text-gray-300">Includes</span>
                  <div className="flex flex-wrap gap-2">
                    {currentProduct.product_includes.split(',')
                      .filter(item => item.trim())
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

              {/* Color Section with Enhanced Styling */}
              {currentProduct?.product_color && (
                <div className="flex flex-col gap-3">
                  <span className="text-sm font-medium text-gray-300">
                    Color
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="default"
                      className="bg-gray-700/50 text-gray-200 hover:bg-gray-700/70 border border-gray-600 transition-colors duration-200"
                    >
                      {currentProduct.product_color.name}
                    </Badge>
                  </div>
                </div>
              )}

              {/* Product Description Section */}
              <div className="space-y-4">
                {[
                  currentProduct?.product_description_1,
                  currentProduct?.product_description_2,
                  currentProduct?.product_description_3,
                ]
                  .filter((description) => description?.trim())
                  .map((description, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CircleCheckBig className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <p className="text-gray-300 leading-relaxed">
                        {description}
                      </p>
                    </div>
                  ))}
              </div>

              {/* Cart Actions */}
              <div className="mt-8 flex gap-4">
                <Button
                  ref={buttonRef}
                  className="flex-1 bg-red-600 hover:bg-red-700 hover:scale-105 transition-all duration-300 relative h-12 text-lg"
                  disabled={
                    !currentProduct?.stock || currentProduct?.stock <= 0
                  }
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 bg-brand hover:bg-darkBrand hover:text-white hover:scale-105 transition-all duration-300 border-slate-700 h-12 text-lg"
                  disabled={
                    !currentProduct?.stock || currentProduct?.stock <= 0
                  }
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Cart Sheet */}
      <CartSheet isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
    </>
  );
};

export default ProductDetails;
