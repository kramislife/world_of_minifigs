const EditWarning = ({ existingReview }) => {
  if (!existingReview?.review) return null;

  // Check if any product in the review has been edited
  const hasEditedProducts = existingReview.review.products?.some(
    (product) => product.isEdited
  );

  return (
    <div className="mb-6 p-4 bg-blue-900/40 border border-blue-500/50 rounded-lg shadow-inner">
      <p className="text-sm text-blue-300">
        <span className="font-semibold">Note:</span> Reviews can only be edited
        once. Please make sure your changes are final.
        {hasEditedProducts && (
          <span className="block mt-2 p-2 bg-yellow-900/40 border border-yellow-600/50 rounded text-yellow-300 font-medium">
            This review has already been edited and cannot be modified further.
          </span>
        )}
      </p>
    </div>
  );
};

export default EditWarning;
