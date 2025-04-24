import React, { useState, useMemo } from "react";
import { MessageSquare, Star } from "lucide-react";
import { RatingDistribution } from "@/components/product/shared/StarRating";
import RatingPhotos from "@/components/product/shared/RatingPhotos";
import RatingGalleryDialog from "@/components/product/shared/RatingGalleryDialog";
import RatingSummary from "@/components/product/shared/RatingSummary";
import RatingShopConfidence from "@/components/product/shared/RatingShopConfidence";
import RatingReviewTabs from "@/components/product/shared/RatingReviewTabs";
import RatingReviewList from "@/components/product/shared/RatingReviewList";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useProductReviews } from "@/hooks/Review/useProductReviews";

const ProductRating = ({ product }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const {
    averageRating,
    totalReviews,
    distribution,
    customerPhotos,
    reviews,
    handleVote,
    user,
    reviewTabs,
  } = useProductReviews(product?._id);

  if (!product) return null;

  return (
    <div className="py-10 px-4">
      <h2 className="text-3xl font-semibold mb-5 flex items-center gap-4">
        <div className="w-1 h-8 bg-accent rounded-full" />
        <span>Ratings & Reviews</span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Left Column - Rating Summary & Shop with Confidence */}
        <div className="lg:col-span-4 space-y-5">
          <RatingSummary
            averageRating={averageRating}
            totalReviews={totalReviews}
          />

          <RatingShopConfidence />
        </div>

        {/* Right Column - Rating Distribution & Customer Photos */}
        <div className="lg:col-span-8 space-y-5">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center text-background">
                <Star className="w-5 h-5 mr-2 text-accent" />
                Rating Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RatingDistribution
                distribution={distribution}
                totalReviews={totalReviews}
              />
            </CardContent>
          </Card>

          <RatingPhotos
            customerPhotos={customerPhotos}
            setIsGalleryOpen={setIsGalleryOpen}
          />
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-semibold flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-accent" />
            Customer Reviews
          </h2>
        </div>

        {/* Review Tabs */}
        <RatingReviewTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          reviewTabs={reviewTabs}
        />

        <RatingReviewList
          reviews={reviews}
          activeTab={activeTab}
          handleVote={handleVote}
          user={user}
        />
      </div>

      {/* Gallery Dialog */}
      <RatingGalleryDialog
        isOpen={isGalleryOpen}
        onOpenChange={setIsGalleryOpen}
        customerPhotos={customerPhotos}
      />
    </div>
  );
};

export default ProductRating;
