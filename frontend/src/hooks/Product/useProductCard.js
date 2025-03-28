import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetProductReviewsQuery } from "@/redux/api/reviewApi";
import { useGetProductDetailsQuery } from "@/redux/api/productApi";

export const useProductCard = (product) => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [imagesList, setImagesList] = useState([]);
  const [intervalId, setIntervalId] = useState(null);

  // Get reviews for this product
  const { data: reviewsData } = useGetProductReviewsQuery(product?._id, {
    skip: !product?._id,
  });

  // Optionally fetch similar products - only execute if product has a partID
  const shouldFetchSimilar = Boolean(product?.partID);
  const { data: productDetails } = useGetProductDetailsQuery(product?._id, {
    skip: !shouldFetchSimilar || !product?._id,
  });

  // Get review stats
  const reviewStats = reviewsData?.stats || {
    averageRating: 0,
    totalReviews: 0,
  };

  // Prepare list of images to display - either similar products or this product's images
  useEffect(() => {
    // If we have similar products with the same partID
    if (productDetails?.similarProducts?.length > 0 && product?.partID) {
      // Filter products with same partID and get their primary images
      const similarImages = [product, ...productDetails.similarProducts]
        .filter(
          (item, index, self) =>
            // Remove duplicates and ensure they have same partID
            item.partID === product.partID &&
            index === self.findIndex((t) => t._id === item._id)
        )
        .filter((p) => p.product_images && p.product_images.length > 0)
        .map((p) => ({
          url: p.product_images[0].url,
          id: p._id,
        }));

      if (similarImages.length > 1) {
        setImagesList(similarImages);
        return;
      }
    }

    // Fallback to using this product's own images if no similar products
    if (product?.product_images && product.product_images.length > 0) {
      setImagesList(
        product.product_images.map((img) => ({
          url: img.url,
          id: product._id,
        }))
      );
    } else {
      setImagesList([]);
    }
  }, [product, productDetails]);

  // Handle mouse enter - start image rotation
  const handleMouseEnter = () => {
    setIsHovering(true);
    if (imagesList.length > 1) {
      // Clear any existing interval
      if (intervalId) clearInterval(intervalId);
      // Set up new interval to cycle through images
      const id = setInterval(() => {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % imagesList.length
        );
      }, 1200); // Change image every 1.2 seconds
      setIntervalId(id);
    }
  };

  // Handle mouse leave - reset image and clear interval
  const handleMouseLeave = () => {
    setIsHovering(false);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    // Reset to first image
    setCurrentImageIndex(0);
  };

  // Function to handle the "View Details" button click
  const handleViewDetails = () => {
    // If we're showing a different color variant image, navigate to that product
    if (
      isHovering &&
      imagesList.length > 1 &&
      imagesList[currentImageIndex].id !== product._id
    ) {
      navigate(`/products/${imagesList[currentImageIndex].id}`);
      return;
    }

    // Otherwise navigate to this product
    navigate(`/products/${product?._id}`);
  };

  // Check if we have any images to display
  const hasImages = imagesList.length > 0;

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return {
    currentImageIndex,
    isHovering,
    imagesList,
    hasImages,
    reviewStats,
    handleMouseEnter,
    handleMouseLeave,
    handleViewDetails,
  };
};
