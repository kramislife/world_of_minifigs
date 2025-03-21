import React, { useMemo, useState } from "react";
import {
  Quote,
  User,
  BadgeCheck,
  Edit2,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Shield,
  Star,
  Clock,
  Truck,
  RotateCcw,
  ImageIcon,
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
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

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

  // Add a new function to get all product images from reviews
  const getAllProductImages = useMemo(() => {
    if (!reviews.length) return [];

    const images = [];
    reviews.forEach((review) => {
      review.products.forEach((prod) => {
        if (
          prod.product.toString() === product._id.toString() &&
          prod.images?.length > 0
        ) {
          images.push(...prod.images);
        }
      });
    });
    return images;
  }, [reviews, product._id]);

  // Add this helper function for letter avatar
  const getInitialLetter = (name) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  const confidenceFeatures = [
    {
      icon: <Shield className="w-6 h-6 text-red-500" />,
      title: "Authentic Products",
      description: "100% genuine World of Minifigs parts",
    },
    {
      icon: <Truck className="w-6 h-6 text-red-500" />,
      title: "Fast Shipping",
      description: "Orders ship within 24 hours",
    },
    {
      icon: <RotateCcw className="w-6 h-6 text-red-500" />,
      title: "Easy Returns",
      description: "30-day hassle-free returns",
    },
  ];

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Update the customer photos section with fallback
  const CustomerPhotosSection = () => (
    <div className="bg-brand/70 p-8 rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Customer Photos</h3>
        {getAllProductImages.length > 0 && (
          <button
            onClick={() => setIsGalleryOpen(true)}
            className="text-red-500 text-sm hover:underline"
          >
            View all
          </button>
        )}
      </div>

      {getAllProductImages.length > 0 ? (
        <div className="flex gap-3">
          {getAllProductImages.slice(0, 4).map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={`Customer review ${index + 1}`}
              className="w-16 h-16 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => window.open(image.url, "_blank")}
            />
          ))}
          {getAllProductImages.length > 4 && (
            <div
              className="w-16 h-16 rounded-lg cursor-pointer bg-gray-700/50 flex items-center justify-center hover:bg-gray-600/50 transition-colors"
              onClick={() => setIsGalleryOpen(true)}
            >
              <span className="text-lg font-semibold text-white">
                +{getAllProductImages.length - 4}
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-gray-400">
          <ImageIcon className="w-12 h-12 mb-3 opacity-50" />
          <p className="text-sm">No customer photos yet</p>
          <p className="text-xs mt-1">Be the first to share your experience!</p>
        </div>
      )}
    </div>
  );

  // Update the gallery dialog to include fallback
  const GalleryDialog = () => (
    <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
      <DialogContent className="max-w-4xl p-6 bg-brand/90">
        <h3 className="text-xl font-semibold mb-6">Customer Photos</h3>
        {getAllProductImages.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {getAllProductImages.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`Customer review ${index + 1}`}
                className="aspect-square w-full object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => window.open(image.url, "_blank")}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <ImageIcon className="w-16 h-16 mb-4 opacity-50" />
            <p className="text-lg">No customer photos available</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );

  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("most_recent");

  // Update the filtering logic
  const filteredReviews = useMemo(() => {
    if (!reviews) return [];

    return reviews.filter((review) => {
      const productReview = review.products.find(
        (prod) => prod.product.toString() === product._id.toString()
      );

      if (!productReview) return false;

      switch (activeTab) {
        case "with_comments":
          // Only show reviews that have text comments but NO images
          return (
            productReview.reviewText?.trim().length > 0 &&
            (!productReview.images || productReview.images.length === 0)
          );
        case "star_only":
          // Only show reviews that have no text comments and no images
          return (
            (!productReview.reviewText ||
              productReview.reviewText.trim().length === 0) &&
            (!productReview.images || productReview.images.length === 0)
          );
        case "with_photos":
          // Show reviews that have photos (may or may not have comments)
          return productReview.images?.length > 0;
        default:
          return true;
      }
    });
  }, [reviews, activeTab, product._id]);

  // Update the tab count calculations
  const tabCounts = useMemo(
    () => ({
      all: reviews?.length || 0,
      with_comments:
        reviews?.filter((review) =>
          review.products.find(
            (prod) =>
              prod.product.toString() === product._id.toString() &&
              prod.reviewText?.trim().length > 0 &&
              (!prod.images || prod.images.length === 0)
          )
        ).length || 0,
      star_only:
        reviews?.filter((review) =>
          review.products.find(
            (prod) =>
              prod.product.toString() === product._id.toString() &&
              (!prod.reviewText || prod.reviewText.trim().length === 0) &&
              (!prod.images || prod.images.length === 0)
          )
        ).length || 0,
      with_photos:
        reviews?.filter((review) =>
          review.products.find(
            (prod) =>
              prod.product.toString() === product._id.toString() &&
              prod.images?.length > 0
          )
        ).length || 0,
    }),
    [reviews, product._id]
  );

  if (!product) return null;
  if (isLoading) return <div>Loading reviews...</div>;

  return (
    <div className="bg-brand-gradient py-12 px-4 sm:px-6 lg:px-8">
      <div className=" mx-auto">
        {/* Header with red accent */}
        <h2 className="text-4xl font-bold mb-8 flex items-center gap-4">
          <div className="w-1 h-10 bg-red-500 rounded" />
          <span>Ratings & Reviews</span>
        </h2>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Column - Rating Summary & Shop with Confidence */}
          <div className="lg:col-span-4 space-y-5">
            {/* Rating Summary Card */}
            <div className="bg-brand/70 p-8 rounded-xl">
              <div className="flex flex-col items-center">
                <div className="text-6xl font-bold mb-2">
                  {ratingStats.averageRating}
                  <span className="text-2xl text-gray-400">/5.0</span>
                </div>
                <div className="mb-3">
                  <StarRating
                    rating={Number(ratingStats.averageRating)}
                    size={24}
                  />
                </div>
                <div className="text-gray-400 mb-6">
                  ({ratingStats.totalReviews}) reviews
                </div>
                <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                  Write a Review
                </Button>
                <p className="text-sm text-gray-400 mt-4 text-center">
                  Share your experience to help other collectors
                </p>
              </div>
            </div>

            {/* Shop with Confidence Card */}
            <div className="bg-brand/70 p-8 rounded-xl">
              <h3 className="text-xl font-semibold mb-6">
                Shop With Confidence
              </h3>
              <div className="space-y-6">
                {confidenceFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0">{feature.icon}</div>
                    <div>
                      <h4 className="font-semibold text-white">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Rating Distribution & Customer Photos */}
          <div className="lg:col-span-8 space-y-5">
            {/* Rating Distribution Card */}
            <div className="bg-brand/70 p-8 rounded-xl">
              <h3 className="text-xl font-semibold mb-6">
                Rating Distribution
              </h3>
              <div className="space-y-4">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center gap-4">
                    <span className="w-4 text-gray-400">{stars}</span>
                    <Progress
                      value={
                        ratingStats.totalReviews > 0
                          ? (ratingStats.distribution[5 - stars] /
                              ratingStats.totalReviews) *
                            100
                          : 0
                      }
                      className="h-2 flex-1 bg-gray-700/50"
                    />
                    <span className="text-sm text-gray-400 w-8">
                      ({ratingStats.distribution[5 - stars]})
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Photos Card */}
            <CustomerPhotosSection />
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Customer Reviews</h2>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-brand/70 border border-gray-600 rounded-lg px-4 py-2 text-sm"
            >
              <option value="most_recent">Most Recent</option>
              <option value="highest_rating">Highest Rating</option>
              <option value="lowest_rating">Lowest Rating</option>
            </select>
          </div>

          {/* Review Tabs */}
          <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
            {[
              { id: "all", label: `All Reviews (${tabCounts.all})` },
              {
                id: "with_comments",
                label: `With Comments (${tabCounts.with_comments})`,
              },
              { id: "star_only", label: `Star Only (${tabCounts.star_only})` },
              {
                id: "with_photos",
                label: `With Photos (${tabCounts.with_photos})`,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-brand text-white"
                    : "bg-brand/70 text-gray-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {filteredReviews.length > 0 ? (
              filteredReviews.map((review) => (
                <Card key={review._id} className="bg-brand/70 border-none">
                  {review.products.map((prod) => {
                    if (prod.product.toString() === product._id.toString()) {
                      return (
                        <div key={prod.product} className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                              <Avatar>
                                {review.user?.avatar?.url ? (
                                  <AvatarImage src={review.user.avatar.url} />
                                ) : (
                                  <AvatarFallback className="bg-blue-500">
                                    {getInitialLetter(review.user.name)}
                                  </AvatarFallback>
                                )}
                              </Avatar>
                              <div className="space-y-4">
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium">
                                      {review.user.name}
                                    </span>
                                    {review.user.is_verified && (
                                      <Badge variant="info" className="text-xs">
                                        Verified Buyer
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <StarRating
                                      rating={prod.rating}
                                      size={16}
                                    />
                                    <span className="text-sm text-gray-400">
                                      {format(
                                        new Date(review.createdAt),
                                        "MMM dd, yyyy"
                                      )}
                                    </span>
                                  </div>
                                </div>

                                {prod.reviewText && (
                                  <p className="text-gray-200">
                                    {prod.reviewText}
                                  </p>
                                )}

                                {prod.images?.length > 0 && (
                                  <div className="flex gap-2">
                                    {prod.images.map((image, index) => (
                                      <img
                                        key={index}
                                        src={image.url}
                                        alt={`Review ${index + 1}`}
                                        className="w-16 h-16 object-cover rounded-lg cursor-pointer"
                                        onClick={() =>
                                          window.open(image.url, "_blank")
                                        }
                                      />
                                    ))}
                                  </div>
                                )}

                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                  <button
                                    onClick={() =>
                                      handleVote(
                                        review._id,
                                        prod.product,
                                        "helpful"
                                      )
                                    }
                                    className="flex items-center gap-1 hover:text-white"
                                  >
                                    <ThumbsUp className="w-4 h-4" />
                                    Helpful ({prod.helpfulVotes?.length || 0})
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleVote(
                                        review._id,
                                        prod.product,
                                        "unhelpful"
                                      )
                                    }
                                    className="flex items-center gap-1 hover:text-white"
                                  >
                                    <ThumbsDown className="w-4 h-4" />
                                    Not Helpful (
                                    {prod.unhelpfulVotes?.length || 0})
                                  </button>
                                  <button
                                    onClick={() =>
                                      setShowReplyInput({
                                        ...showReplyInput,
                                        [review._id]:
                                          !showReplyInput[review._id],
                                      })
                                    }
                                    className="flex items-center gap-1 hover:text-white"
                                  >
                                    <MessageSquare className="w-4 h-4" />
                                    Reply
                                  </button>
                                </div>

                                {showReplyInput[review._id] && (
                                  <div className="space-y-2">
                                    <Textarea
                                      value={replyText[review._id] || ""}
                                      onChange={(e) =>
                                        setReplyText({
                                          ...replyText,
                                          [review._id]: e.target.value,
                                        })
                                      }
                                      placeholder="Write your reply..."
                                      className="min-h-[100px]"
                                    />
                                    <div className="flex justify-end gap-2">
                                      <Button
                                        variant="outline"
                                        onClick={() => {
                                          setShowReplyInput({
                                            ...showReplyInput,
                                            [review._id]: false,
                                          });
                                          setReplyText({
                                            ...replyText,
                                            [review._id]: "",
                                          });
                                        }}
                                      >
                                        Cancel
                                      </Button>
                                      <Button
                                        onClick={() =>
                                          handleReply(review._id, prod.product)
                                        }
                                      >
                                        Submit Reply
                                      </Button>
                                    </div>
                                  </div>
                                )}

                                {/* Display Replies */}
                                {prod.replies?.length > 0 && (
                                  <div className="mt-4 space-y-4">
                                    {prod.replies.map((reply, index) => (
                                      <div
                                        key={index}
                                        className="flex items-start gap-3 pl-6 border-l-2 border-gray-700"
                                      >
                                        <Avatar className="w-8 h-8">
                                          {reply.user?.avatar?.url ? (
                                            <AvatarImage
                                              src={reply.user.avatar.url}
                                            />
                                          ) : (
                                            <AvatarFallback className="bg-blue-500 text-xs">
                                              {getInitialLetter(
                                                reply.user.name
                                              )}
                                            </AvatarFallback>
                                          )}
                                        </Avatar>
                                        <div>
                                          <div className="flex items-center gap-2">
                                            <span className="font-medium text-sm">
                                              {reply.user.name}
                                            </span>
                                            {reply.user.is_verified && (
                                              <Badge
                                                variant="info"
                                                className="text-xs"
                                              >
                                                Verified Buyer
                                              </Badge>
                                            )}
                                          </div>
                                          <p className="text-sm text-gray-300 mt-1">
                                            {reply.text}
                                          </p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </Card>
              ))
            ) : (
              <p className="text-center text-gray-400 py-8">
                No reviews found for the selected filter.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Gallery Dialog */}
      <GalleryDialog />
    </div>
  );
};

export default ProductRating;
