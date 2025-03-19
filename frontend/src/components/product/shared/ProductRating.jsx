import React, { useMemo, useState } from "react";
import {
  Quote,
  User,
  BadgeCheck,
  Edit2,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import StarRating from "@/components/product/shared/StarRating";
import { useGetProductReviewsQuery } from "@/redux/api/reviewApi";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  useVoteReviewMutation,
  useAddReplyToReviewMutation,
} from "@/redux/api/reviewApi";
import { toast } from "react-toastify";

const ProductRating = ({ product }) => {
  const { data: reviewsData, isLoading } = useGetProductReviewsQuery(
    product?._id
  );
  const reviews = reviewsData?.reviews || [];

  console.log("Product ID:", product?._id); // Debug log
  console.log("Reviews Data:", reviewsData); // Debug log

  const ratingStats = useMemo(() => {
    if (!reviews.length)
      return {
        averageRating: 0,
        distribution: Array(5).fill(0),
        totalReviews: 0,
      };

    const distribution = Array(5).fill(0);
    let totalRating = 0;
    let validReviewCount = 0;

    reviews.forEach((review) => {
      review.products.forEach((prod) => {
        // Convert both IDs to strings for comparison
        if (prod.product.toString() === product._id.toString()) {
          distribution[5 - prod.rating]++;
          totalRating += prod.rating;
          validReviewCount++;
        }
      });
    });

    return {
      averageRating:
        validReviewCount > 0
          ? (totalRating / validReviewCount).toFixed(1)
          : "0.0",
      distribution,
      totalReviews: validReviewCount,
    };
  }, [reviews, product._id]);

  const [replyText, setReplyText] = useState({});
  const [showReplyInput, setShowReplyInput] = useState({});
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [voteReview] = useVoteReviewMutation();
  const [addReply] = useAddReplyToReviewMutation();

  const handleVote = async (reviewId, productId, voteType) => {
    if (!isAuthenticated) {
      toast.error("Please login to vote");
      return;
    }

    // Check if the review is from the current user
    const review = reviewsData?.reviews?.find((r) => r._id === reviewId);
    if (review?.user?._id === user?._id) {
      toast.error("You cannot vote on your own review");
      return;
    }

    if (!user.is_verified) {
      toast.error("Only verified users can vote on reviews");
      return;
    }

    try {
      await voteReview({
        reviewId,
        productId,
        voteType,
      }).unwrap();
    } catch (error) {
      toast.error(error.data?.message || "Failed to record vote");
    }
  };

  const handleReply = async (reviewId, productId) => {
    if (!isAuthenticated) {
      toast.error("Please login to reply");
      return;
    }

    const text = replyText[reviewId];
    if (!text?.trim()) {
      toast.error("Reply cannot be empty");
      return;
    }

    try {
      const response = await addReply({
        reviewId,
        productId,
        text,
      }).unwrap();

      setReplyText({ ...replyText, [reviewId]: "" });
      setShowReplyInput({ ...showReplyInput, [reviewId]: false });
      toast.success(response.message);
    } catch (error) {
      if (error.status === 403) {
        toast.error("Please verify your account to reply to reviews");
      } else {
        toast.error(error.data?.message || "Failed to add reply");
      }
    }
  };

  if (!product) return null;
  if (isLoading) return <div>Loading reviews...</div>;

  return (
    <div className="bg-brand-gradient py-12 px-6">
      <div>
        <h2 className="text-3xl font-semibold mb-8 flex items-center gap-4">
          <div className="w-1 h-8 bg-red-500 rounded" />
          <span>Ratings & Reviews</span>
        </h2>

        <div className="flex flex-col md:flex-row justify-between mb-16 px-10 pt-10">
          {/* Average Rating Display */}
          <div className="flex flex-col items-center justify-center">
            <div className="text-5xl font-semibold mb-4">
              {ratingStats.averageRating}
              <span className="text-3xl text-gray-400">/5.0</span>
            </div>
            <div className="mb-3">
              <StarRating rating={Number(ratingStats.averageRating)} />
            </div>
            <div className="text-sm text-gray-400">
              ({ratingStats.totalReviews}) reviews
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="flex-1 w-full max-w-2xl space-y-3">
            {[5, 4, 3, 2, 1].map((stars, index) => (
              <div key={stars} className="flex items-center gap-4">
                <span className="w-4 text-gray-400">{stars}</span>
                <div className="flex gap-2 items-center flex-1">
                  <StarRating rating={stars} />
                  <Progress
                    value={
                      ratingStats.totalReviews > 0
                        ? (ratingStats.distribution[5 - stars] /
                            ratingStats.totalReviews) *
                          100
                        : 0
                    }
                    className={`h-2 flex-1 bg-gray-700/50 ${
                      ratingStats.distribution[5 - stars] > 0
                        ? "[&>div]:bg-yellow-400"
                        : "[&>div]:bg-gray-600"
                    }`}
                  />
                  <span className="text-sm text-gray-400 w-8">
                    ({ratingStats.distribution[5 - stars]})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold text-white mb-6">
            Customer Reviews
          </h3>
          <div className="space-y-6">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <Card key={review._id} className="bg-brand/70 border-none">
                  {review.products.map((prod) => {
                    if (prod.product.toString() === product._id.toString()) {
                      return (
                        <div key={prod.product} className="p-6 space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={review.user?.avatar?.url} />
                                <AvatarFallback>
                                  <User className="w-4 h-4" />
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-white flex items-center gap-2">
                                  {review.user.name}
                                  {review.user.is_verified && (
                                    <BadgeCheck className="w-4 h-4 text-blue-400" />
                                  )}
                                </p>
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                  <StarRating rating={prod.rating} />
                                  <span>•</span>
                                  <span>
                                    {format(
                                      new Date(review.createdAt),
                                      "MMM dd, yyyy"
                                    )}
                                  </span>
                                  {prod.isEdited && (
                                    <>
                                      <span>•</span>
                                      <span className="flex items-center gap-1">
                                        <Edit2 className="w-3 h-3" />
                                        edited
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <p className="text-gray-300 leading-relaxed">
                              {prod.editedReviewText || prod.reviewText}
                            </p>

                            {/* Review Images */}
                            {prod.images?.length > 0 && (
                              <div className="flex gap-2">
                                {prod.images.map((img, index) => (
                                  <img
                                    key={index}
                                    src={img.url}
                                    alt={`Review ${index + 1}`}
                                    className="w-20 h-20 object-cover rounded-lg cursor-pointer"
                                    onClick={() =>
                                      window.open(img.url, "_blank")
                                    }
                                  />
                                ))}
                              </div>
                            )}

                            {/* Vote and Reply Buttons */}
                            <div className="flex items-center gap-4">
                              <button
                                onClick={() =>
                                  handleVote(
                                    review._id,
                                    prod.product,
                                    "helpful"
                                  )
                                }
                                disabled={review.user?._id === user?._id}
                                className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm
                                  ${
                                    review.user?._id === user?._id
                                      ? "opacity-50 cursor-not-allowed"
                                      : ""
                                  }
                                  ${
                                    prod.helpfulVotes?.includes(user?._id)
                                      ? "bg-green-500/20 text-green-400"
                                      : "hover:bg-gray-700/50"
                                  }`}
                              >
                                <ThumbsUp className="w-4 h-4" />
                                <span>{prod.helpfulVotes?.length || 0}</span>
                              </button>

                              <button
                                onClick={() =>
                                  handleVote(
                                    review._id,
                                    prod.product,
                                    "unhelpful"
                                  )
                                }
                                disabled={review.user?._id === user?._id}
                                className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm
                                  ${
                                    review.user?._id === user?._id
                                      ? "opacity-50 cursor-not-allowed"
                                      : ""
                                  }
                                  ${
                                    prod.unhelpfulVotes?.includes(user?._id)
                                      ? "bg-red-500/20 text-red-400"
                                      : "hover:bg-gray-700/50"
                                  }`}
                              >
                                <ThumbsDown className="w-4 h-4" />
                                <span>{prod.unhelpfulVotes?.length || 0}</span>
                              </button>

                              <button
                                onClick={() =>
                                  setShowReplyInput({
                                    ...showReplyInput,
                                    [review._id]: !showReplyInput[review._id],
                                  })
                                }
                                className="flex items-center gap-2 px-3 py-1 rounded-full text-sm hover:bg-gray-700/50"
                              >
                                <MessageSquare className="w-4 h-4" />
                                <span>{prod.replies?.length || 0} Replies</span>
                              </button>
                            </div>

                            {/* Replies Section */}
                            {showReplyInput[review._id] && (
                              <div className="space-y-4 pt-4 border-t border-gray-700">
                                {/* Reply Input */}
                                {isAuthenticated && (
                                  <div className="flex items-start gap-3">
                                    <Avatar className="mt-2">
                                      <AvatarImage src={user?.avatar?.url} />
                                      <AvatarFallback>
                                        <User className="w-4 h-4" />
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 space-y-2">
                                      <Textarea
                                        value={replyText[review._id] || ""}
                                        onChange={(e) =>
                                          setReplyText({
                                            ...replyText,
                                            [review._id]: e.target.value,
                                          })
                                        }
                                        placeholder="Write your reply..."
                                        className="min-h-[100px] bg-gray-800 border-gray-700"
                                      />
                                      <Button
                                        onClick={() =>
                                          handleReply(review._id, prod.product)
                                        }
                                        className="bg-blue-600 hover:bg-blue-700"
                                      >
                                        Post Reply
                                      </Button>
                                    </div>
                                  </div>
                                )}

                                {/* Display Replies */}
                                {prod.replies?.length > 0 && (
                                  <div className="space-y-4 mt-4">
                                    {prod.replies.map((reply, index) => (
                                      <div
                                        key={index}
                                        className="flex items-start gap-3"
                                      >
                                        <Avatar>
                                          <AvatarImage
                                            src={reply.user?.avatar?.url}
                                          />
                                          <AvatarFallback>
                                            <User className="w-4 h-4" />
                                          </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                          <div className="flex items-center gap-2 mb-1">
                                            <span className="font-medium text-white">
                                              {reply.user?.name || "Anonymous"}
                                            </span>
                                            {reply.user?.is_verified && (
                                              <BadgeCheck className="w-4 h-4 text-blue-400" />
                                            )}
                                            <span className="text-xs text-gray-400">
                                              {format(
                                                new Date(reply.createdAt),
                                                "MMM dd, yyyy"
                                              )}
                                            </span>
                                          </div>
                                          <p className="text-gray-300">
                                            {reply.text}
                                          </p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </Card>
              ))
            ) : (
              <Card className="bg-brand/70 border-none text-white p-8 rounded-xl shadow-lg text-center">
                <p className="text-gray-300 text-lg">
                  No reviews yet. Be the first to share your experience!
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductRating;
