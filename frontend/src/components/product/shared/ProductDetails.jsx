import React, { useState, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  CircleCheckBig,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Metadata from "@/components/layout/Metadata/Metadata";
import StarRating from "@/components/product/shared/StarRating";
import ProductStatus from "@/components/product/shared/ProductStatus";

const ProductDetails = ({ product, containerVariants, itemVariants }) => {
  // const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Add ref for the thumbnail container
  const thumbnailContainerRef = useRef(null);

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

  // Determine if images are available
  const hasImages =
    product?.product_images && product.product_images.length > 0;

  // Placeholder image components
  const PlaceholderImage = () => (
    <div className="w-full h-full bg-brand-gradient flex items-center justify-center border border-slate-700 rounded-lg">
      <ImageIcon className="w-16 h-16 text-slate-500" />
    </div>
  );

  const PlaceholderThumbnail = () => (
    <div className="w-full flex md:flex-col gap-2">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="min-w-[130px] md:min-w-0 aspect-square rounded-lg bg-brand-gradient border border-slate-700 flex items-center justify-center"
        >
          <ImageIcon className="w-8 h-8 text-slate-500" />
        </div>
      ))}
    </div>
  );

  // Update navigation functions to include scroll
  const nextImage = () => {
    if (!hasImages) return;
    const newIndex =
      currentImageIndex === product.product_images.length - 1
        ? 0
        : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
    scrollThumbnailIntoView(newIndex);
  };

  const prevImage = () => {
    if (!hasImages) return;
    const newIndex =
      currentImageIndex === 0
        ? product.product_images.length - 1
        : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
    scrollThumbnailIntoView(newIndex);
  };

  const selectImage = (index) => {
    if (!hasImages) return;
    setCurrentImageIndex(index);
  };

  return (
    <>
      <Metadata title={product?.product_name || "Product Details"} />
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
                {hasImages ? (
                  <div className="flex flex-row md:flex-col gap-2">
                    {product.product_images.map((image) => (
                      <button
                        key={image.public_id}
                        onClick={() =>
                          selectImage(
                            product.product_images.findIndex(
                              (img) => img.public_id === image.public_id
                            )
                          )
                        }
                        className={`min-w-[130px] max-w-[130px] md:min-w-0 md:max-w-full aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                          currentImageIndex ===
                          product.product_images.findIndex(
                            (img) => img.public_id === image.public_id
                          )
                            ? "border-red-600 border-4"
                            : "border border-slate-700"
                        }`}
                      >
                        <img
                          src={image.url}
                          alt={`Thumbnail ${image.public_id}`}
                          className="w-full h-full object-fill transition-transform duration-300"
                        />
                      </button>
                    ))}
                  </div>
                ) : (
                  <PlaceholderThumbnail />
                )}
              </div>
            </div>

            {/* Main Image Display */}
            <div className="flex-1 relative bg-blue-950 rounded-lg overflow-hidden aspect-square">
              {hasImages ? (
                <AnimatePresence mode="wait">
                  <motion.img
                    key={product.product_images[currentImageIndex].public_id}
                    src={product.product_images[currentImageIndex].url}
                    alt={`Product view ${product.product_images[currentImageIndex].public_id}`}
                    className="w-full h-full object-fill"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>
              ) : (
                <PlaceholderImage />
              )}

              {hasImages && (
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
            {/* Basic Info Section - Always visible */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-white mb-2">
                {product?.product_name || "Unnamed Product"}
              </h1>

              <div className="flex items-center gap-1 mb-8">
                {product?.ratings ? (
                  <>
                    <StarRating rating={product.ratings} />
                    <span className="text-gray-400 ml-2 text-sm">
                      ({product.ratings})
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
                    (product?.price || 0) *
                    (1 - (product?.discount || 0) / 100)
                  ).toFixed(2)}
                </span>
                {product?.discount > 0 && (
                  <span className="text-xl text-red-500 line-through">
                    ${(product?.price || 0).toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Availability Section */}
            {product?.product_availability && (
              <div className="mb-6">
                <div className="flex items-center space-x-2">
                  <ProductStatus stock={product?.stock} variant="dot" />
                  {product?.pre_order && product?.release_date && (
                    <span className="text-gray-400 text-sm">
                      (Available{" "}
                      {new Date(product.release_date).toLocaleDateString()})
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Details Section */}
            <div className="mb-6">
              {/* Category and Collection row */}
              <div className="flex flex-wrap gap-2 mb-2">
                <div className="flex-1">
                  {/* Category Button */}
                  {product?.product_category &&
                    product.product_category.length > 0 && (
                      <Button
                        variant="outline"
                        className="bg-brand hover:bg-darkBrand hover:text-white transition-all duration-300 border-slate-700 inline-flex w-full text-left justify-start mb-2"
                      >
                        <div className="flex items-center gap-2">
                          <span className="whitespace-nowrap">Category:</span>
                          <span className="text-gray-400">
                            {product.product_category
                              .map((category) => category?.name)
                              .join(", ")}
                          </span>
                        </div>
                      </Button>
                    )}

                  {/* Includes Button */}
                  {product?.product_includes && (
                    <Button
                      variant="outline"
                      className="bg-brand hover:bg-darkBrand hover:text-white transition-all duration-300 border-slate-700 inline-flex w-full text-left justify-start"
                    >
                      <div className="flex items-center gap-2">
                        <span className="whitespace-nowrap">Includes:</span>
                        <span className="text-gray-400">
                          {product.product_includes}
                        </span>
                      </div>
                    </Button>
                  )}
                </div>

                {/* Collection Button */}
                {product?.product_collection &&
                  product.product_collection.length > 0 && (
                    <Button
                      variant="outline"
                      className="bg-brand hover:bg-darkBrand hover:text-white transition-all duration-300 border-slate-700 inline-flex w-auto text-left justify-start flex-1"
                    >
                      <div className="flex items-center gap-2">
                        <span className="whitespace-nowrap">Collection:</span>
                        <span className="text-gray-400">
                          {product.product_collection
                            .map((collection) => collection?.name)
                            .join(", ")}
                        </span>
                      </div>
                    </Button>
                  )}
              </div>
            </div>

            {/* Description Section */}
            <div className="mb-6">
              {[
                product?.product_description_1,
                product?.product_description_2,
                product?.product_description_3,
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

            {/* Quantity and Cart Section - Always at bottom */}
            <div className="mt-auto">
              {/* <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center border rounded-md">
                  <Button
                    className="rounded-r-none"
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    className="rounded-l-none"
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div> */}
              <div className="flex space-x-4">
                <Button
                  className="w-full bg-red-600 hover:bg-red-700 hover:scale-105 transition-all duration-300"
                  disabled={!product?.stock || product?.stock <= 0}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className="bg-brand hover:bg-darkBrand hover:text-white hover:scale-105 transition-all duration-300 border-slate-700 w-full"
                  disabled={!product?.stock || product?.stock <= 0}
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default ProductDetails;
