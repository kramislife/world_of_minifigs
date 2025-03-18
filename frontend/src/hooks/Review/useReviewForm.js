import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import {
  useCreateReviewMutation,
  useUpdateReviewMutation,
} from "@/redux/api/reviewApi";

const useReviewForm = (order, existingReview, onOpenChange) => {
  const [ratings, setRatings] = useState({});
  const [reviews, setReviews] = useState({});
  const [images, setImages] = useState({});
  const [editedProducts, setEditedProducts] = useState({});
  const fileInputRefs = useRef({});
  const [createReview, { isLoading: isCreating }] = useCreateReviewMutation();
  const [updateReview, { isLoading: isUpdating }] = useUpdateReviewMutation();

  const isProductEdited = (productId) => {
    return (
      existingReview?.review?.products?.find(
        (product) => product.product === productId
      )?.isEdited || false
    );
  };

  useEffect(() => {
    if (existingReview?.review?.products) {
      const initialRatings = {};
      const initialReviews = {};
      const initialImages = {};
      const initialEditedStatus = {};

      existingReview.review.products.forEach((product) => {
        const productId = product.product;
        initialRatings[productId] = product.rating;
        initialReviews[productId] =
          product.editedReviewText || product.reviewText;
        initialEditedStatus[productId] = product.isEdited || false;

        if (product.images && product.images.length > 0) {
          initialImages[productId] = product.images.map((img) => img.url);
        }
      });

      setRatings(initialRatings);
      setReviews(initialReviews);
      setImages(initialImages);
      setEditedProducts(initialEditedStatus);
    } else {
      setRatings({});
      setReviews({});
      setImages({});
      setEditedProducts({});
    }
  }, [existingReview]);

  const handleRating = (productId, rating) => {
    if (isProductEdited(productId)) {
      toast.error(
        "This review has already been edited and cannot be modified further."
      );
      return;
    }
    setRatings((prev) => ({
      ...prev,
      [productId]: rating,
    }));
    setEditedProducts((prev) => ({
      ...prev,
      [productId]: true,
    }));
  };

  const handleReviewChange = (productId, text) => {
    if (isProductEdited(productId)) {
      toast.error(
        "This review has already been edited and cannot be modified further."
      );
      return;
    }
    setReviews((prev) => ({
      ...prev,
      [productId]: text,
    }));
    setEditedProducts((prev) => ({
      ...prev,
      [productId]: true,
    }));
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

    const imagePromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises)
      .then((results) => {
        setImages((prev) => ({
          ...prev,
          [productId]: [...(prev[productId] || []), ...results],
        }));
        setEditedProducts((prev) => ({
          ...prev,
          [productId]: true,
        }));
      })
      .catch((error) => {
        toast.error("Error processing images");
        console.error("Error processing images:", error);
      });
    e.target.value = "";
  };

  const handleRemoveImage = (productId, index) => {
    if (isProductEdited(productId)) {
      toast.error(
        "This review has already been edited and cannot be modified further."
      );
      return;
    }
    setImages((prev) => ({
      ...prev,
      [productId]: prev[productId].filter((_, i) => i !== index),
    }));
    setEditedProducts((prev) => ({
      ...prev,
      [productId]: true,
    }));
  };

  const handleSubmit = async () => {
    try {
      const editedProductIds = Object.entries(editedProducts)
        .filter(([_, isEdited]) => isEdited)
        .map(([productId]) => productId);

      if (editedProductIds.length === 0) {
        toast.error("No changes have been made to the review");
        return;
      }

      const hasInvalidReviews = editedProductIds.some(
        (productId) => !reviews[productId]?.trim()
      );
      if (hasInvalidReviews) {
        toast.error("Please provide review text for all edited products");
        return;
      }

      const hasInvalidRatings = editedProductIds.some(
        (productId) => !ratings[productId]
      );
      if (hasInvalidRatings) {
        toast.error("Please provide ratings for all edited products");
        return;
      }

      const productReviews = order?.orderItems
        ?.filter((item) => editedProductIds.includes(item.product._id))
        .map((item) => ({
          product: item.product._id,
          productName: item.name,
          rating: ratings[item.product._id],
          reviewText: reviews[item.product._id],
          images: images[item.product._id] || [],
          isEdited: true,
        }));

      if (existingReview?.review) {
        const response = await updateReview({
          reviewId: existingReview.review._id,
          reviewData: { products: productReviews },
        }).unwrap();

        if (response.success) {
          toast.success("Review updated successfully!");
          onOpenChange(false);
        }
      } else {
        const response = await createReview({
          order: order._id,
          products: productReviews,
        }).unwrap();

        if (response.success) {
          toast.success("Review submitted successfully!");
          onOpenChange(false);
        }
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error(error.data?.message || "Failed to submit review");
    }
  };

  return {
    ratings,
    reviews,
    images,
    fileInputRefs,
    isCreating,
    isUpdating,
    isEdited: editedProducts,
    handleRating,
    handleReviewChange,
    handleImageUpload,
    handleRemoveImage,
    handleSubmit,
  };
};

export default useReviewForm;
