import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  PlaceholderImage,
  ProductThumbnailPlaceholder,
} from "@/components/product/shared/FallbackStates";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
        <Badge variant="accent">{currentProduct.discount}% OFF</Badge>
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
        <div className="w-full md:w-[110px] relative">
          <div className="w-full h-full overflow-y-auto no-scrollbar">
            <div className="flex flex-row md:flex-col gap-2 md:max-h-[600px]">
              <ProductThumbnailPlaceholder />
            </div>
          </div>
        </div>
        <div className="flex-1 relative bg-brand-dark/30 rounded-lg overflow-hidden">
          <div className="w-full pt-[100%] relative">
            <DiscountBadge />
            <div className="absolute inset-0">
              <PlaceholderImage width="w-64" />
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Modify the navigation handlers to update URL
  const handlePrevImage = () => {
    if (similarProducts) {
      const prevIndex =
        currentImageIndex === 0
          ? displayItems.length - 1
          : currentImageIndex - 1;
      const prevProduct = displayItems[prevIndex];
      if (prevProduct?._id) {
        navigate(`/products/${prevProduct._id}`);
      }
    }
    prevImage();
  };

  const handleNextImage = () => {
    if (similarProducts) {
      const nextIndex =
        currentImageIndex === displayItems.length - 1
          ? 0
          : currentImageIndex + 1;
      const nextProduct = displayItems[nextIndex];
      if (nextProduct?._id) {
        navigate(`/products/${nextProduct._id}`);
      }
    }
    nextImage();
  };

  // Modify thumbnail click handler
  const handleThumbnailClick = (index) => {
    if (similarProducts) {
      const selectedProduct = displayItems[index];
      if (selectedProduct?._id) {
        navigate(`/products/${selectedProduct._id}`);
      }
    }
    setCurrentImageIndex(index);
  };

  return (
    <motion.div
      variants={itemVariants}
      className="relative flex flex-col-reverse md:flex-row gap-4 h-fit"
    >
      {/* Thumbnails with max-height */}
      <div className="w-full md:w-[110px] relative">
        <div
          className="w-full h-full overflow-y-auto no-scrollbar"
          ref={thumbnailContainerRef}
        >
          <div className="flex flex-row md:flex-col gap-2 md:max-h-[600px]">
            {displayItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className="group relative min-w-[130px] max-w-[130px] md:min-w-0 md:max-w-full"
              >
                <div className="pt-[100%] relative">
                  <div
                    className={`absolute inset-0 rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageIndex === index
                        ? "border-accent border-4"
                        : "border border-brand-start"
                    }`}
                  >
                    {similarProducts ? (
                      item.product_images?.[0]?.url ? (
                        <img
                          src={item.product_images[0].url}
                          alt={`${item.product_name}`}
                          className="w-full h-full object-contain md:object-cover"
                        />
                      ) : (
                        <PlaceholderImage width="w-16" />
                      )
                    ) : item.url ? (
                      <img
                        src={item.url}
                        alt={`${currentProduct.product_name} view ${index + 1}`}
                        className="w-full h-full object-contain md:object-cover"
                      />
                    ) : (
                      <PlaceholderImage width="w-16" />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Image Display */}
      <div className="flex-1 relative rounded-lg overflow-hidden">
        <div className="w-full pt-[100%] relative">
          <DiscountBadge />

          <div className="absolute inset-0">
            <AnimatePresence mode="wait">
              {similarProducts ? (
                displayItems[currentImageIndex]?.product_images?.[0]?.url ? (
                  <motion.img
                    key={currentImageIndex}
                    src={displayItems[currentImageIndex].product_images[0].url}
                    alt={displayItems[currentImageIndex]?.product_name}
                    className="w-full h-full object-contain"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                  />
                ) : (
                  <PlaceholderImage width="w-64" />
                )
              ) : displayItems[currentImageIndex]?.url ? (
                <motion.img
                  key={currentImageIndex}
                  src={displayItems[currentImageIndex].url}
                  alt={currentProduct?.product_name}
                  className="w-full h-full object-contain"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                />
              ) : (
                <PlaceholderImage width="w-64" />
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          {displayItems.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-foreground/50 hover:bg-foreground/70 z-10"
                onClick={handlePrevImage}
              >
                <ChevronLeft className="w-6 h-6 text-background" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-foreground/50 hover:bg-foreground/70 z-10"
                onClick={handleNextImage}
              >
                <ChevronRight className="w-6 h-6 text-background" />
              </Button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductImageGallery;
