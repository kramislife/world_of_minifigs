import React from "react";
import Metadata from "@/components/layout/Metadata/Metadata";
import ProductImageGallery from "@/components/product/shared/ProductImageGallery";
import ProductInfo from "@/components/product/shared/ProductInfo";
import { useProductImages } from "@/hooks/Product/useProductImages";

const ProductDetails = ({
  product,
  similarProducts,
  itemVariants,
  reviewStats,
}) => {
  const {
    thumbnailContainerRef,
    currentImageIndex,
    setCurrentImageIndex,
    currentProduct,
    displayItems,
    colorVariants,
    nextImage,
    prevImage,
    scrollThumbnailIntoView,
    pageTitle,
  } = useProductImages(product, similarProducts, itemVariants, reviewStats);

  return (
    <>
      <Metadata title={pageTitle} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 p-5">
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
            colorVariants={colorVariants}
            scrollThumbnailIntoView={scrollThumbnailIntoView}
            reviewStats={reviewStats}
          />
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
