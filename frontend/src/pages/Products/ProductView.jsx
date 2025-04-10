import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import ProductDetails from "@/components/product/ProductDetails";
import ProductRating from "@/components/product/ProductRating";
import ProductSpecification from "@/components/product/ProductSpecification";
import Metadata from "@/components/layout/Metadata/Metadata";
import { useGetProductDetailsQuery } from "@/redux/api/productApi";
import { useGetProductReviewsQuery } from "@/redux/api/reviewApi";
import { productViewAnimations } from "@/hooks/Animation/animationConfig";
import ProductViewSkeleton from "@/components/layout/skeleton/Products/ProductViewSkeleton";
import { FallbackMessage } from "@/components/product/shared/FallbackStates";
import { Box, Dices, Ruler, User } from "lucide-react";

const ProductView = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetProductDetailsQuery(id);

  // Fetch product reviews
  const { data: reviewsData } = useGetProductReviewsQuery(id, {
    skip: !id,
  });

  // Get review stats
  const reviewStats = reviewsData?.stats || {
    averageRating: 0,
    totalReviews: 0,
  };

  // Combine current product with similar products for display
  const similarProducts = useMemo(() => {
    if (!data?.product || !data?.similarProducts?.length) return null;

    // Make sure current product is included in similar products list
    const allProducts = [data.product, ...data.similarProducts].filter(
      (item, index, self) => index === self.findIndex((t) => t._id === item._id)
    );

    // Only return if we have more than one product (meaning we have similar products)
    return allProducts.length > 1 ? allProducts : null;
  }, [data?.product, data?.similarProducts]);

  // Define default specifications
  const DEFAULT_SPECS = {
    pieceCount: {
      title: "Piece Count",
      icon: <Box className="w-8 h-8 text-orange-400" />,
    },
    skillLevel: {
      title: "Skill Level",
      icon: <Dices className="w-8 h-8 text-green-400" />,
    },
    dimensions: {
      title: "Dimensions",
      icon: <Ruler className="w-8 h-8 text-blue-400" />,
    },
    designer: {
      title: "Designed By",
      icon: <User className="w-8 h-8 text-purple-400" />,
    },
  };

  // Prepare the specifications data
  const prepareSpecifications = (product) => {
    if (!product) return [];

    const formatDimensions = () => {
      const dims = [];
      if (product?.product_length) dims.push(`L: ${product.product_length}`);
      if (product?.product_width) dims.push(`W: ${product.product_width}`);
      if (product?.product_height) dims.push(`H: ${product.product_height}`);
      return dims.length > 0
        ? [dims.join(" × ")]
        : ["Dimensions not specified"];
    };

    return [
      {
        ...DEFAULT_SPECS.pieceCount,
        items: product?.product_piece_count
          ? [
              `${product?.product_piece_count} ${
                product?.product_piece_count === 1 ? "piece" : "pieces"
              }`,
            ]
          : ["Piece count not specified"],
      },
      {
        ...DEFAULT_SPECS.skillLevel,
        items: product?.product_skill_level?.name
          ? [product.product_skill_level.name]
          : ["Skill level not specified"],
      },
      {
        ...DEFAULT_SPECS.dimensions,
        items: formatDimensions(),
      },
      {
        ...DEFAULT_SPECS.designer,
        items: product?.product_designer?.name
          ? [product.product_designer.name]
          : ["Designer not specified"],
      },
    ].filter((spec) => spec.items.length > 0);
  };

  // Create specifications for the current product
  const productSpecifications = useMemo(() => {
    return prepareSpecifications(data?.product);
  }, [data?.product]);

  // Show skeleton during loading
  if (isLoading) {
    return <ProductViewSkeleton />;
  }

  // Show error message if there is an error
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <FallbackMessage
          title="Error Loading Product"
          message={
            error?.data?.message ||
            "There was a problem loading the product details. Please try again later."
          }
        />
      </div>
    );
  }

  // Show fallback message if no product data
  if (!data?.product) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <FallbackMessage
          title="Product Not Found"
          message="The product you're looking for doesn't seem to exist or may have been removed."
        />
      </div>
    );
  }

  return (
    <>
      <Metadata title={data?.product?.product_name || "Product Details"} />
      {/* Product Details */}
      <ProductDetails
        product={data?.product}
        similarProducts={similarProducts}
        containerVariants={productViewAnimations.containerVariants}
        itemVariants={productViewAnimations.itemVariants}
        reviewStats={reviewStats}
      />

      {/* Product Specification - Now passing the prepared specifications */}
      <ProductSpecification
        product={data?.product}
        specifications={productSpecifications}
      />

      {/* Product Rating */}
      <ProductRating product={data?.product} reviewStats={reviewStats} />
    </>
  );
};

export default ProductView;
