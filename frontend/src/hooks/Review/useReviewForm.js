import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setBuyNowItem } from "@/redux/features/buyNowSlice";
import { useImageUpload } from "@/hooks/ImageUpload/useImageUpload";
import {
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useGetReviewByOrderIdQuery,
} from "@/redux/api/reviewApi";

const useReviewForm = (order, onOpenChange) => {
  const [ratings, setRatings] = useState({});
  const [reviews, setReviews] = useState({});
  const [images, setImages] = useState({});
  const [editedProducts, setEditedProducts] = useState({});
  const [processingImages, setProcessingImages] = useState({});
  const [showReviewBox, setShowReviewBox] = useState({});
  const fileInputRefs = useRef({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [createReview, { isLoading: isCreating }] = useCreateReviewMutation();
  const [updateReview, { isLoading: isUpdating }] = useUpdateReviewMutation();

  const { data: existingReview } = useGetReviewByOrderIdQuery(order?._id, {
    skip: !order?._id || !order?.isReviewed,
  });

  // Use the standardized image upload hook
  const { handleImageUpload: processImage, isUploading: isCompressing } =
    useImageUpload({
      maxSizeMB: 0.8,
      maxWidthOrHeight: 1200,
      maxFileSize: 5 * 1024 * 1024,
      onSuccess: (imageData, productId) => {
        // Update images state with the processed image URL
        setImages((prev) => ({
          ...prev,
          [productId]: [...(prev[productId] || []), imageData],
        }));

        // Decrease processing count
        setProcessingImages((prev) => ({
          ...prev,
          [productId]: Math.max(0, (prev[productId] || 0) - 1),
        }));
      },
      onError: (error) => {
        toast.error(error.message);
        setProcessingImages((prev) => ({
          ...prev,
          [productId]: Math.max(0, (prev[productId] || 0) - 1),
        }));
      },
    });

  // Initialize state from existing review
  useEffect(() => {
    if (existingReview?.review?.products) {
      const initialState = existingReview.review.products.reduce(
        (acc, product) => {
          const productId = product.product;
          return {
            ratings: { ...acc.ratings, [productId]: product.rating },
            reviews: {
              ...acc.reviews,
              [productId]: product.editedReviewText || product.reviewText,
            },
            images: {
              ...acc.images,
              [productId]: product.images?.map((img) => img.url) || [],
            },
            editedProducts: {
              ...acc.editedProducts,
              [productId]: product.isEdited || false,
            },
          };
        },
        { ratings: {}, reviews: {}, images: {}, editedProducts: {} }
      );

      setRatings(initialState.ratings);
      setReviews(initialState.reviews);
      setImages(initialState.images);
      setEditedProducts(initialState.editedProducts);
    }
  }, [existingReview]);

  const isProductEdited = (productId) => {
    return existingReview?.review?.products?.find(
      (product) => product.product === productId && product.isEdited
    );
  };

  const hasEditedProducts =
    existingReview?.review?.products?.some(
      (product) => product.isEdited && product.editedAt
    ) || false;

  const handleRating = (productId, rating) => {
    if (isProductEdited(productId)) {
      toast.error(
        "This review has already been edited and cannot be modified further."
      );
      return;
    }
    setRatings((prev) => ({ ...prev, [productId]: rating }));
    setEditedProducts((prev) => ({ ...prev, [productId]: true }));
  };

  const handleReviewChange = (productId, text) => {
    if (isProductEdited(productId)) {
      toast.error(
        "This review has already been edited and cannot be modified further."
      );
      return;
    }
    setReviews((prev) => ({ ...prev, [productId]: text }));
    setEditedProducts((prev) => ({ ...prev, [productId]: true }));
  };

  const handleImageUpload = (productId, e) => {
    if (isProductEdited(productId)) {
      toast.error(
        "This review has already been edited and cannot be modified further."
      );
      return;
    }

    const files = Array.from(e.target.files);
    const currentImages = images[productId] || [];

    if (currentImages.length + files.length > 3) {
      toast.error("Maximum 3 images allowed per review");
      return;
    }

    // Process each file to base64
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          const base64String = reader.result;
          setImages((prev) => ({
            ...prev,
            [productId]: [...(prev[productId] || []), base64String],
          }));
          setEditedProducts((prev) => ({
            ...prev,
            [productId]: true,
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (productId, index) => {
    if (isProductEdited(productId)) {
      toast.error(
        "This review has already been edited and cannot be modified further."
      );
      return;
    }

    setImages((prev) => {
      const newImages = { ...prev };
      if (newImages[productId]) {
        // Revoke the URL to prevent memory leaks
        URL.revokeObjectURL(newImages[productId][index]);
        newImages[productId] = newImages[productId].filter(
          (_, i) => i !== index
        );
      }
      return newImages;
    });
  };

  const handleBuyAgain = (item) => {
    const buyNowItem = {
      product: item.product._id,
      name: item.name,
      discounted_price: item.discountedPrice,
      price: item.price,
      discount: item.discount,
      image: item.image,
      quantity: 1,
      color: item.color || null,
      includes: item.includes || "",
    };

    dispatch(setBuyNowItem(buyNowItem));
    navigate("/checkout?mode=buy_now");
  };

  const handleSubmit = async () => {
    try {
      const hasChanges = order?.orderItems?.some((item) => {
        const productId = item.product._id;
        const hasNewRating = ratings[productId] !== undefined;
        const hasNewReview = reviews[productId] !== undefined;
        const hasNewImages = images[productId]?.length > 0;
        return hasNewRating || hasNewReview || hasNewImages;
      });

      if (!hasChanges) {
        toast.error("No changes have been made to the review");
        return;
      }

      // Process products with their images
      const processedProducts = order?.orderItems?.map((item) => {
        const productId = item.product._id;
        const existingProduct = existingReview?.review?.products?.find(
          (p) => p.product === productId
        );

        return {
          product: productId,
          productName: item.name,
          rating: ratings[productId] || existingProduct?.rating,
          reviewText: reviews[productId] || existingProduct?.reviewText || "",
          // Send the base64 image data
          images: images[productId] || [],
        };
      });

      const response = await (existingReview?.review
        ? updateReview({
            reviewId: existingReview.review._id,
            reviewData: { products: processedProducts },
          })
        : createReview({
            order: order._id,
            products: processedProducts,
          })
      ).unwrap();

      if (response.success) {
        toast.success(
          existingReview?.review
            ? "Review updated successfully!"
            : "Review submitted successfully!"
        );
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error(error.data?.message || "Failed to submit review");
    }
  };

  const toggleReviewBox = (productId) => {
    setShowReviewBox((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  return {
    // State
    ratings,
    reviews,
    images,
    fileInputRefs,
    processingImages,
    showReviewBox,
    existingReview,
    isCreating,
    isUpdating,
    isCompressing,

    // Computed values
    hasEditedProducts,

    // Handlers
    handleRating,
    handleReviewChange,
    handleImageUpload,
    handleRemoveImage,
    handleBuyAgain,
    handleSubmit,
    toggleReviewBox,
    isProductEdited,
  };
};

export default useReviewForm;
