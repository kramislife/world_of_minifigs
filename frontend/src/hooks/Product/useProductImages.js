import { useState, useEffect, useMemo } from "react";

export const useProductImages = (
  product,
  similarProducts,
  thumbnailContainerRef
) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentProduct, setCurrentProduct] = useState(product);

  // Update current product immediately when product prop changes
  useEffect(() => {
    setCurrentProduct(product);
  }, [product]);

  // Sort and filter similar products based on partID and organize by color
  const displayItems = useMemo(() => {
    if (similarProducts) {
      // Filter products with the same partID
      const filteredProducts = similarProducts.filter(
        (item) => item.partID === product.partID
      );

      // Add current product to the list if not already included
      const allProducts = [product, ...filteredProducts].filter(
        (item, index, self) =>
          index === self.findIndex((t) => t._id === item._id)
      );

      // Sort products to match thumbnail order
      // This ensures color variants match the thumbnail sequence
      return allProducts.sort((a, b) => {
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

  // Get color variants in the same order as thumbnails
  const colorVariants = useMemo(() => {
    return displayItems
      .filter((item) => item.product_color) // Only items with colors
      .map((item) => ({
        id: item._id,
        color: {
          _id: item.product_color._id,
          name: item.product_color.name,
          code: item.product_color.code,
        },
        isActive: item._id === currentProduct._id,
        thumbnailIndex: displayItems.findIndex((d) => d._id === item._id),
      }))
      .filter(
        (v, i, self) =>
          // Remove duplicates while maintaining thumbnail order
          i === self.findIndex((t) => t.color._id === v.color._id)
      );
  }, [displayItems, currentProduct]);

  const scrollThumbnailIntoView = (index) => {
    if (!thumbnailContainerRef?.current) return;

    try {
      const container = thumbnailContainerRef.current;
      const thumbnails = container.children[0]?.children;

      if (thumbnails?.[index]) {
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
    } catch (error) {
      console.warn("Error scrolling thumbnail into view:", error);
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
    colorVariants,
    nextImage,
    prevImage,
    scrollThumbnailIntoView,
  };
};
