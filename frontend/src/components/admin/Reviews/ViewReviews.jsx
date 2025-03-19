import React, { useState, useMemo } from "react";
import ViewLayout from "@/components/admin/shared/ViewLayout";
import { useGetAllReviewsQuery } from "@/redux/api/reviewApi";
import { createReviewColumns } from "@/components/admin/shared/table/columns/ReviewColumns";

const ViewReviews = () => {
  // Queries
  const { data: reviewData, isLoading, error } = useGetAllReviewsQuery();

  // State
  const [globalFilter, setGlobalFilter] = useState("");

  // Column component for table
  const columns = useMemo(() => createReviewColumns(), []);

  // Transform data for table
  const data = useMemo(() => {
    if (!reviewData?.reviews) return [];
    return reviewData.reviews.flatMap((review) =>
      review.products.map((prod, index) => ({
        id: `${review._id}-${index}`,
        _id: review._id,
        userName: review.user?.name || "Unknown User",
        userEmail: review.user?.email || "N/A",
        productName: prod.productName || "Unknown Product",
        rating: prod.rating,
        reviewText:
          prod.reviewText || prod.editedReviewText || "No review text",
        helpfulVotes: prod.helpfulVotes?.length || 0,
        unhelpfulVotes: prod.unhelpfulVotes?.length || 0,
        replies: prod.replies?.length || 0,
        isEdited: prod.isEdited || false,
        createdAt: new Date(review.createdAt).toLocaleString(),
        updatedAt: review.updatedAt
          ? new Date(review.updatedAt).toLocaleString()
          : "Not Updated",
      }))
    );
  }, [reviewData]);

  return (
    <ViewLayout
      title="Review"
      description="View and monitor product reviews"
      isLoading={isLoading}
      error={error}
      data={data}
      columns={columns}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
    />
  );
};

export default ViewReviews;
