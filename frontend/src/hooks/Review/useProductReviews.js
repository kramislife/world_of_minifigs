import { useMemo } from "react";
import {
  useGetProductReviewsQuery,
  useVoteReviewMutation,
} from "@/redux/api/reviewApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

export const useProductReviews = (productId) => {
  const { data: reviewData, isLoading } = useGetProductReviewsQuery(productId);
  const [voteReview] = useVoteReviewMutation();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const handleVote = async (review, voteType) => {
    try {
      if (!review || !review._id || !productId) {
        toast.error("Invalid review data");
        return;
      }

      // Check if user is authenticated
      if (!isAuthenticated) {
        navigate("/login", {
          state: {
            from: location.pathname,
            returnTo: "product",
            action: "vote",
          },
        });
        toast.info("Please login to vote on reviews");
        return;
      }

      // Check if user is verified
      if (!user?.is_verified) {
        toast.error("Only verified users can vote on reviews");
        return;
      }

      // Check if user is trying to vote on their own review
      if (review.user?._id === user._id) {
        toast.error("You cannot vote on your own review");
        return;
      }

      const productReview = review.productDetails;
      if (!productReview) {
        toast.error("Review details not found");
        return;
      }

      const hasVotedHelpful = productReview.helpfulVotes?.includes(user._id);
      const hasVotedUnhelpful = productReview.unhelpfulVotes?.includes(
        user._id
      );

      // Handle vote switching logic
      if (voteType === "helpful") {
        if (hasVotedHelpful) {
          toast.info("Vote removed");
        } else if (hasVotedUnhelpful) {
          toast.success("Vote changed to helpful");
        } else {
          toast.success("Marked as helpful");
        }
      } else if (voteType === "unhelpful") {
        if (hasVotedUnhelpful) {
          toast.info("Vote removed");
        } else if (hasVotedHelpful) {
          toast.success("Vote changed to not helpful");
        } else {
          toast.success("Marked as not helpful");
        }
      }

      await voteReview({
        reviewId: review._id,
        productId,
        voteType,
      }).unwrap();
    } catch (error) {
      console.error("Vote error:", error);
      toast.error(error?.data?.message || "Failed to record vote");
    }
  };

  const processedData = useMemo(() => {
    if (!reviewData || !productId) {
      return {
        averageRating: "0.0",
        totalReviews: 0,
        distribution: [0, 0, 0, 0, 0],
        customerPhotos: [],
        reviews: {
          all: [],
          with_comments: [],
          star_only: [],
          with_photos: [],
        },
      };
    }

    try {
      // Filter reviews for the specific product
      const productReviews = reviewData.reviews.reduce((acc, review) => {
        const productReview = review.products?.find(
          (p) => p.product === productId
        );
        if (productReview) {
          return [...acc, { ...review, productDetails: productReview }];
        }
        return acc;
      }, []);

      // Categorize reviews
      const categorizedReviews = {
        all: productReviews,
        with_comments: productReviews.filter(
          (review) =>
            review.productDetails?.reviewText &&
            !review.productDetails?.images?.length
        ),
        star_only: productReviews.filter(
          (review) =>
            !review.productDetails?.reviewText &&
            !review.productDetails?.images?.length
        ),
        with_photos: productReviews.filter(
          (review) => review.productDetails?.images?.length > 0
        ),
      };

      // Get all customer photos from reviews
      const customerPhotos = productReviews.reduce((photos, review) => {
        if (review.productDetails?.images?.length > 0) {
          return [...photos, ...review.productDetails.images];
        }
        return photos;
      }, []);

      return {
        averageRating: reviewData.stats?.averageRating || "0.0",
        totalReviews: reviewData.stats?.totalReviews || 0,
        distribution: reviewData.stats?.distribution || [0, 0, 0, 0, 0],
        customerPhotos,
        reviews: categorizedReviews,
      };
    } catch (error) {
      console.error("Data processing error:", error);
      return {
        averageRating: "0.0",
        totalReviews: 0,
        distribution: [0, 0, 0, 0, 0],
        customerPhotos: [],
        reviews: {
          all: [],
          with_comments: [],
          star_only: [],
          with_photos: [],
        },
      };
    }
  }, [reviewData, productId]);

  const tabCounts = useMemo(
    () => ({
      all: processedData.reviews.all?.length || 0,
      with_comments: processedData.reviews.with_comments?.length || 0,
      star_only: processedData.reviews.star_only?.length || 0,
      with_photos: processedData.reviews.with_photos?.length || 0,
    }),
    [processedData.reviews]
  );

  const reviewTabs = useMemo(
    () => [
      { id: "all", label: `All Reviews (${tabCounts.all})` },
      {
        id: "with_comments",
        label: `With Comments (${tabCounts.with_comments})`,
      },
      { id: "star_only", label: `Stars (${tabCounts.star_only})` },
      {
        id: "with_photos",
        label: `With Photos (${tabCounts.with_photos})`,
      },
    ],
    [tabCounts]
  );

  return {
    ...processedData,
    isLoading,
    handleVote,
    isAuthenticated,
    user,
    tabCounts,
    reviewTabs,
  };
};
