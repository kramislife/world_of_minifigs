import React from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "@/components/product/ProductCard";
import { FallbackMessage } from "@/components/product/shared/FallbackStates";
import { Button } from "@/components/ui/button";
import SkeletonGrid from "@/components/layout/skeleton/Home/SkeletonGrid";

// A Product Grid that displays four columns of products in Best Selling and Latest Products
const ProductGrid = ({ title, products, baseUrl, isLoading, isError }) => {
  const navigate = useNavigate();

  // Display Skeleton while loading
  if (isLoading) {
    return <SkeletonGrid />;
  }

  // Display error message if there is an error
  if (isError)
    return (
      <FallbackMessage
        title="Error Loading Products"
        message="There was a problem loading the products. Please try again later."
      />
    );

  // Show fallback state when no products are available
  if (!products?.length) {
    return (
      <FallbackMessage
        title={`No ${title} Available`}
        message={`Every masterpiece starts with a single brick. Watch this space for amazing new ${title}!`}
      />
    );
  }

  // Function to handle the "View All" button click
  const handleViewAll = () => {
    const categoryId = baseUrl.split("=")[1];
    navigate(`/products?product_category=${categoryId}`);
  };

  return (
    <section className="flex flex-col p-5">
      <h2 className="text-3xl font-extrabold text-center py-5">{title}</h2>

      <div className="flex items-center justify-center pb-2">
        <Button onClick={handleViewAll} variant="accent">
          View All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 py-5">
        {products.slice(0, 4).map((product) => (
          <div key={product._id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
