import React, { useRef, useState } from "react";
import Metadata from "@/components/layout/Metadata/Metadata";
import CartSheet from "@/components/layout/header/CartSheet";
import { useProductImages } from "@/hooks/Product/useProductImages";
import ProductImageGallery from "@/components/product/shared/ProductImageGallery";
import ProductInfo from "@/components/product/shared/ProductInfo";

const ProductDetails = ({
  product,
  similarProducts,
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
      <div className="p-5 bg-brand-start">
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
      </div>

      <CartSheet isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
    </>
  );
};

export default ProductDetails;
