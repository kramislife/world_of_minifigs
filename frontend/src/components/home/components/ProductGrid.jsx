import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "@/components/product/ProductCard";
import { CategoryFallback } from "@/components/product/shared/FallbackStates";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SkeletonGrid from "@/components/layout/skeleton/Home/SkeletonGrid";

// Component that displays four columns of products in Best Selling and Latest Products in Home Page
const ProductGrid = ({
  title,
  products,
  baseUrl,
  animations,
  isLoading,
  isError,
}) => {
  const navigate = useNavigate();
  const ref = useRef(null);

  if (isLoading) {
    return <SkeletonGrid />;
  }

  if (isError)
    return (
      <CategoryFallback
        title="Error Loading Products"
        message="There was a problem loading the products. Please try again later."
      />
    );

  // Show fallback state when no products are available
  if (!products?.length) {
    return (
      <CategoryFallback
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
    <div ref={ref} className="p-4 flex flex-col">
      <motion.h2
        variants={animations.titleVariants}
        initial="visible"
        animate="visible"
        className="text-3xl text-gray-300 font-extrabold mb-4 text-center pt-6"
      >
        {title}
      </motion.h2>

      <motion.div
        variants={animations.buttonVariants}
        initial="visible"
        animate="visible"
        className="flex items-center justify-center pb-10"
      >
        <Button onClick={handleViewAll} variant="accent">
          View All
        </Button>
      </motion.div>

      <motion.div
        variants={animations.containerVariants}
        initial="visible"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 py-5"
      >
        {products.slice(0, 4).map((product) => (
          <motion.div key={product._id} variants={animations.cardVariants}>
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ProductGrid;
