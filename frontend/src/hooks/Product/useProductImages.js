import { useState, useEffect, useMemo } from "react";

export const useProductImages = (
  product,
  similarProducts,
  thumbnailContainerRef
) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentProduct, setCurrentProduct] = useState(product);

  // Sort and filter similar products based on partID
  const displayItems = useMemo(() => {
    if (similarProducts) {
      // Filter products with the same partID
      const filteredProducts = similarProducts.filter(
        (item) => item.partID === product.partID
      );

      // Sort products by itemID to maintain consistent order
      return filteredProducts.sort((a, b) => {
        // Extract numeric part of itemID for proper sorting
        const idA = parseInt(a.itemID || a._id);
        const idB = parseInt(b.itemID || b._id);
        return idA - idB;
      });
    }
    return product?.product_images?.length > 0
      ? product.product_images
      : [{ url: product?.product_images?.[0]?.url }];
  }, [similarProducts, product]);

  // Find current index when product changes
  useEffect(() => {
    if (similarProducts && product) {
      const index = displayItems.findIndex((item) => item._id === product._id);
      if (index !== -1) {
        setCurrentImageIndex(index);
      }
    }
  }, [product, similarProducts, displayItems]);

  // Update current product when navigating
  useEffect(() => {
    if (similarProducts) {
      setCurrentProduct(displayItems[currentImageIndex]);
    } else {
      setCurrentProduct(product);
    }
  }, [currentImageIndex, similarProducts, product, displayItems]);

  const scrollThumbnailIntoView = (index) => {
    if (!thumbnailContainerRef.current) return;
    const container = thumbnailContainerRef.current;
    const thumbnails = container.children[0].children;

    if (thumbnails[index]) {
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

  return {
    currentImageIndex,
    setCurrentImageIndex,
    currentProduct,
    displayItems,
    nextImage,
    prevImage,
    scrollThumbnailIntoView,
  };
};
