import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductDetails from "@/components/product/shared/ProductDetails";
import ProductRating from "@/components/product/shared/ProductRating";
import ProductSpecification from "@/components/product/shared/ProductSpecification";
import Metadata from "@/components/layout/Metadata/Metadata";
import { useGetProductDetailsQuery } from "@/redux/api/productApi";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/layout/spinner/LoadingSpinner";
import { productViewAnimations } from "@/hooks/animationConfig";

const ProductView = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetProductDetailsQuery(id);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [error, isError]);

  return (
    <>
      <Metadata title={data?.product?.product_name || "Product Details"} />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="min-h-screen bg-brand-gradient">

          {/* Product Details */}
          <ProductDetails
            product={data?.product}
            containerVariants={productViewAnimations.containerVariants}
            itemVariants={productViewAnimations.itemVariants}
          />

          {/* Product Specification */}
          <ProductSpecification product={data?.product} />

          {/* Product Rating */}
          <ProductRating product={data?.product} />
        </div>
      )}
    </>
  );
};

export default ProductView;
