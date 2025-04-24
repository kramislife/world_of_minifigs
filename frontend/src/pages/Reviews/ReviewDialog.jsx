import { Dialog, DialogContent } from "@/components/ui/dialog";
import ReviewHeader from "./components/ReviewHeader";
import EditWarning from "./components/EditWarning";
import ReviewActions from "./components/ReviewActions";
import ProductReviewCard from "./components/ProductReviewCard";
import useReviewForm from "@/hooks/Review/useReviewForm";

const ReviewDialog = ({ open, onOpenChange, order, existingReview }) => {
  const {
    ratings,
    reviews,
    images,
    fileInputRefs,
    processingImages,
    isCreating,
    isUpdating,
    isCompressing,
    handleRating,
    handleReviewChange,
    handleImageUpload,
    handleRemoveImage,
    handleBuyAgain,
    handleSubmit,
    isProductEdited,
    showReviewBox,
    toggleReviewBox,
  } = useReviewForm(order, onOpenChange);

  // Skip rendering if no order
  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <ReviewHeader existingReview={existingReview} orderId={order?._id} />

        <EditWarning existingReview={existingReview} />

        {order?.orderItems?.map((item, index) => (
          <ProductReviewCard
            key={`${order?._id}-${item._id}-${index}`}
            item={item}
            ratings={ratings}
            reviews={reviews}
            images={images}
            fileInputRefs={fileInputRefs}
            handleRating={handleRating}
            handleReviewChange={handleReviewChange}
            handleImageUpload={handleImageUpload}
            handleRemoveImage={handleRemoveImage}
            handleBuyAgain={() => handleBuyAgain(item)}
            isProductEdited={isProductEdited(item.product._id)}
            processingImages={processingImages}
            isCompressing={isCompressing}
            showReviewBox={showReviewBox[item.product._id]}
            toggleReviewBox={() => toggleReviewBox(item.product._id)}
            existingReview={existingReview}
          />
        ))}

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
