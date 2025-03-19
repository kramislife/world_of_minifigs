import { Dialog, DialogContent } from "@/components/ui/dialog";
import ReviewHeader from "./components/ReviewHeader";
import EditWarning from "./components/EditWarning";
import ReviewActions from "./components/ReviewActions";
import ProductReviewCard from "./components/ProductReviewCard";
import useReviewForm from "@/hooks/Review/useReviewForm";

const ReviewDialog = ({ open, onOpenChange, order, existingReview = null }) => {
  const {
    ratings,
    reviews,
    images,
    fileInputRefs,
    isCreating,
    isUpdating,
    handleRating,
    handleReviewChange,
    handleImageUpload,
    handleRemoveImage,
    handleSubmit,
  } = useReviewForm(order, existingReview, onOpenChange);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-4xl max-h-[90vh] overflow-y-auto bg-brand border-none 
      scrollbar-none rounded-xl shadow-2xl py-6 px-6"
      >
        <ReviewHeader existingReview={existingReview} orderId={order?._id} />

        <EditWarning existingReview={existingReview} />

        <div className="space-y-8">
          {order?.orderItems?.map((item) => (
            <ProductReviewCard
              key={item._id}
              item={item}
              ratings={ratings}
              reviews={reviews}
              images={images}
              fileInputRefs={fileInputRefs}
              handleRating={handleRating}
              handleReviewChange={handleReviewChange}
              handleImageUpload={handleImageUpload}
              handleRemoveImage={handleRemoveImage}
            />
          ))}
        </div>

        <ReviewActions
          onOpenChange={onOpenChange}
          handleSubmit={handleSubmit}
          isCreating={isCreating}
          isUpdating={isUpdating}
          existingReview={existingReview}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;
