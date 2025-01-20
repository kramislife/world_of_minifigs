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
      return similarProducts; // Already includes main product + similar products
    }
    return product?.product_images?.length > 0
      ? product.product_images
      : [{ url: product?.product_images?.[0]?.url }];
  }, [similarProducts, product]);

  // Update current product when navigating
  useEffect(() => {
    if (similarProducts) {
      setCurrentProduct(similarProducts[currentImageIndex]);
    } else {
      setCurrentProduct(product); // Keep same product when showing multiple images
    }
  }, [currentImageIndex, similarProducts, product]);

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
    try {
      const discountedPrice =
        currentProduct.price * (1 - (currentProduct.discount || 0) / 100);

      // Trigger the animation
      setShowAnimation(true);

      // Delay the actual cart addition to match animation
      setTimeout(() => {
        dispatch(
          addToCart({
            product: currentProduct._id,
            name: currentProduct.product_name,
            quantity: 1,
            price: discountedPrice,
            image: currentProduct.product_images[0]?.url,
            includes: currentProduct.product_includes,
          })
        );

        setShowAnimation(false);
        // Open cart sheet after animation completes
        setIsCartOpen(true);
      }, 800);

      // console.log(`Added to cart: ${currentProduct.product_name}`);
    } catch (error) {
      toast.error("Failed to add item to cart");
      console.error("Add to cart error:", error);
    }
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
                      className={`min-w-[130px] max-w-[130px] md:min-w-0 md:max-w-full aspect-square rounded-lg overflow-hidden border-2 transition-all ${
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
                            ? item.product_name
                            : `${product.product_name} view ${index + 1}`
                        }
                        className="w-full h-full object-fill transition-transform duration-300"
                      />
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
                  alt={
                    similarProducts
                      ? currentProduct?.product_name
                      : `${product.product_name} view ${currentImageIndex + 1}`
                  }
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
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-white mb-2">
                {currentProduct?.product_name || "Unnamed Product"}
              </h1>

              <div className="flex items-center gap-1 mb-8">
                {currentProduct?.ratings ? (
                  <>
                    <StarRating rating={currentProduct.ratings} />
                    <span className="text-gray-400 ml-2 text-sm">
                      ({currentProduct.ratings})
                    </span>
                  </>
                ) : (
                  <span className="text-gray-400 text-sm">No ratings</span>
                )}
              </div>

              {/* Updated Price Display */}
              <div className="flex items-center space-x-4">
                <span className="text-4xl font-semibold">
                  $
                  {(
                    (currentProduct?.price || 0) *
                    (1 - (currentProduct?.discount || 0) / 100)
                  ).toFixed(2)}
                </span>
                {currentProduct?.discount > 0 && (
                  <span className="text-xl text-red-500 line-through">
                    ${(currentProduct?.price || 0).toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Availability Section */}
            {currentProduct?.product_availability && (
              <div className="mb-6">
                <div className="flex items-center space-x-2">
                  <ProductStatus stock={currentProduct?.stock} variant="dot" />
                  {currentProduct?.pre_order &&
                    currentProduct?.release_date && (
                      <span className="text-gray-400 text-sm">
                        (Available{" "}
                        {new Date(
                          currentProduct.release_date
                        ).toLocaleDateString()}
                        )
                      </span>
                    )}
                </div>
              </div>
            )}

            {/* Details Section */}
            <div className="mb-6">
              {/* Category and Collection row */}
              <div className="flex flex-col gap-4">
                {/* Categories and Subcategories */}
                {currentProduct?.product_category && (
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-gray-400">Categories:</span>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(currentProduct.product_category) ? (
                        currentProduct.product_category.map(
                          (category, index) => (
                            <div key={index} className="flex flex-wrap gap-2">
                              <Badge
                                variant="default"
                                className="bg-brand border border-slate-700 hover:bg-darkBrand py-2 px-5"
                              >
                                {category?.name}
                              </Badge>
                              {category?.subcategories?.map(
                                (subcat, subIndex) => (
                                  <Badge
                                    key={subIndex}
                                    variant="outline"
                                    className="hover:bg-brand/10"
                                  >
                                    {subcat?.name}
                                  </Badge>
                                )
                              )}
                            </div>
                          )
                        )
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          <Badge
                            variant="default"
                            className="bg-brand border border-slate-700 hover:bg-darkBrand py-2 px-5"
                          >
                            {currentProduct.product_category?.name}
                          </Badge>
                          {currentProduct.product_category?.subcategories?.map(
                            (subcat, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="hover:bg-brand/10"
                              >
                                {subcat?.name}
                              </Badge>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Collections and Subcollections */}
                {currentProduct?.product_collection && (
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-gray-400">Collections:</span>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(currentProduct.product_collection) ? (
                        currentProduct.product_collection.map(
                          (collection, index) => (
                            <div key={index} className="flex flex-wrap gap-2">
                              <Badge
                                variant="default"
                                className="bg-brand border border-slate-700 hover:bg-darkBrand py-2 px-5"
                              >
                                {collection?.name}
                              </Badge>
                              {collection?.subcollections?.map(
                                (subcoll, subIndex) => (
                                  <Badge
                                    key={subIndex}
                                    variant="outline"
                                    className="hover:bg-brand/10"
                                  >
                                    {subcoll?.name}
                                  </Badge>
                                )
                              )}
                            </div>
                          )
                        )
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          <Badge
                            variant="default"
                            className="bg-brand border border-slate-700 hover:bg-darkBrand py-2 px-5"
                          >
                            {currentProduct.product_collection?.name}
                          </Badge>
                          {currentProduct.product_collection?.subcollections?.map(
                            (subcoll, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="hover:bg-brand/10"
                              >
                                {subcoll?.name}
                              </Badge>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Includes Section - reverted to original design */}
                {currentProduct?.product_includes && (
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-gray-400">Includes:</span>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-5 py-2 bg-brand rounded-md text-sm border border-slate-700 hover:bg-darkBrand transition-colors">
                        {currentProduct.product_includes}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description Section */}
            <div className="mb-6">
              {[
                currentProduct?.product_description_1,
                currentProduct?.product_description_2,
                currentProduct?.product_description_3,
              ]
                .filter((description) => description?.trim()) // Only include non-empty descriptions after trimming whitespace
                .map((description, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 mb-3 last:mb-0"
                  >
                    <CircleCheckBig className="w-4 h-4 text-green-500 mt-1.5 flex-shrink-0" />
                    <p className="text-gray-300 leading-loose">{description}</p>
                  </div>
                ))}
            </div>

            {/* Cart Section */}
            <div className="mt-auto relative">
              <div className="flex space-x-4">
                <Button
                  ref={buttonRef}
                  className="w-full bg-red-600 hover:bg-red-700 hover:scale-105 transition-all duration-300 relative"
                  disabled={
                    !currentProduct?.stock || currentProduct?.stock <= 0
                  }
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>

                <Button
                  variant="outline"
                  className="bg-brand hover:bg-darkBrand hover:text-white hover:scale-105 transition-all duration-300 border-slate-700 w-full"
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
