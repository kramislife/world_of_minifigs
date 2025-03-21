import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Metadata from "@/components/layout/Metadata/Metadata";
import CartSheet from "@/components/layout/header/CartSheet";
import { useProductImages } from "@/hooks/Product/useProductImages";
import ProductImageGallery from "./ProductImageGallery";
import ProductInfo from "./ProductInfo";

const ProductDetails = ({
  product,
  similarProducts,
  containerVariants,
  itemVariants,
  reviewStats,
}) => {
  const thumbnailContainerRef = useRef(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const {
    currentImageIndex,
    setCurrentImageIndex,
    currentProduct,
    displayItems,
    colorVariants,
    nextImage,
    prevImage,
    scrollThumbnailIntoView,
  } = useProductImages(product, similarProducts, thumbnailContainerRef);

  return (
    <>
      <Metadata title={currentProduct?.product_name || "Product Details"} />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-5"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="w-full">
            <ProductImageGallery
              currentProduct={currentProduct}
              displayItems={displayItems}
              currentImageIndex={currentImageIndex}
              setCurrentImageIndex={setCurrentImageIndex}
              thumbnailContainerRef={thumbnailContainerRef}
              nextImage={nextImage}
              prevImage={prevImage}
              similarProducts={similarProducts}
              itemVariants={itemVariants}
            />
          </div>

          <div className="w-full">
            <ProductInfo
              product={currentProduct}
              itemVariants={itemVariants}
              onAddToCart={() => setIsCartOpen(true)}
              colorVariants={colorVariants}
              scrollThumbnailIntoView={scrollThumbnailIntoView}
              reviewStats={reviewStats}
            />
          </div>
        </div>
      </motion.div>

      <CartSheet isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
    </>
  );
};

export default ProductDetails;
