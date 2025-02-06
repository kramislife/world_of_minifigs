import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  ProductImagePlaceholder,
  ProductThumbnailPlaceholder,
} from "./FallbackStates";

const ProductImageGallery = ({
  currentProduct,
  displayItems,
  currentImageIndex,
  setCurrentImageIndex,
  thumbnailContainerRef,
  nextImage,
  prevImage,
  similarProducts,
  itemVariants,
}) => {
  // Check if we have valid images to display
  const hasValidImages =
    displayItems?.length > 0 &&
    (similarProducts
      ? displayItems[0]?.product_images?.[0]?.url
      : displayItems[0]?.url);

  // Discount Badge Component
  const DiscountBadge = () =>
    currentProduct?.discount > 0 && (
      <div className="absolute top-4 right-4 z-10">
        <Badge
          variant="destructive"
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5"
        >
          {currentProduct.discount}% OFF
        </Badge>
      </div>
    );

  // If no images, show placeholder but keep similar products functionality
  if (!hasValidImages && !similarProducts?.length) {
    return (
      <motion.div
        variants={itemVariants}
        className="relative flex flex-col-reverse md:flex-row gap-4 h-fit"
      >
        {/* Thumbnail section with fixed height */}
        <div className="w-full md:w-[150px] relative">
          <div className="w-full h-full overflow-y-auto no-scrollbar">
            <div className="flex flex-row md:flex-col gap-2 md:max-h-[570px]">
              <ProductThumbnailPlaceholder />
            </div>
          </div>
        </div>
        <div className="flex-1 relative bg-blue-950 rounded-lg overflow-hidden aspect-square">
          <DiscountBadge />
          <ProductImagePlaceholder />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={itemVariants}
      className="relative flex flex-col-reverse md:flex-row gap-4 h-fit"
    >
      {/* Thumbnails with max-height */}
      <div className="w-full md:w-[150px] relative">
        <div
          className="w-full h-full overflow-y-auto no-scrollbar"
          ref={thumbnailContainerRef}
        >
          <div className="flex flex-row md:flex-col gap-2 md:max-h-[570px]">
            {displayItems.map((item, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className="group relative min-w-[130px] max-w-[130px] md:min-w-0 md:max-w-full aspect-square"
              >
                <div
                  className={`w-full h-full rounded-lg overflow-hidden border-2 transition-all ${
                    currentImageIndex === index
                      ? "border-red-600 border-4"
                      : "border border-slate-700"
                  }`}
                >
                  {similarProducts ? (
                    item.product_images?.[0]?.url ? (
                      <img
                        src={item.product_images[0].url}
                        alt={`${item.product_name}`}
                        className="w-full h-full object-fill transition-transform duration-300"
                      />
                    ) : (
                      <ProductImagePlaceholder />
                    )
                  ) : item.url ? (
                    <img
                      src={item.url}
                      alt={`${currentProduct.product_name} view ${index + 1}`}
                      className="w-full h-full object-fill transition-transform duration-300"
                    />
                  ) : (
                    <ProductImagePlaceholder />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Image Display */}
      <div className="flex-1 relative bg-blue-950 rounded-lg overflow-hidden aspect-square">
        <DiscountBadge />

        <AnimatePresence mode="wait">
          {similarProducts ? (
            displayItems[currentImageIndex]?.product_images?.[0]?.url ? (
              <motion.img
                key={currentImageIndex}
                src={displayItems[currentImageIndex].product_images[0].url}
                alt={displayItems[currentImageIndex]?.product_name}
                className="w-full h-full object-fill"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
              />
            ) : (
              <ProductImagePlaceholder />
            )
          ) : displayItems[currentImageIndex]?.url ? (
            <motion.img
              key={currentImageIndex}
              src={displayItems[currentImageIndex].url}
              alt={currentProduct?.product_name}
              className="w-full h-full object-fill"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <ProductImagePlaceholder />
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
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
  );
};

export default ProductImageGallery;
