import React from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "@/components/product/ProductCard";
import { CategoryFallback } from "@/components/product/shared/FallbackStates";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

// Component that displays four columns of products in Best Selling and Latest Products in Home Page
const ProductGrid = ({ title, products, baseUrl, animations }) => {
  const navigate = useNavigate();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: "some" });

  // Function to handle the "View All" button click
  const handleViewAll = () => {
    const categoryId = baseUrl.split("=")[1];
    navigate(`/products?product_category=${categoryId}`);
  };

  // Fallback state for when no products are available
  if (!products?.length) {
    return (
      <CategoryFallback
        title={`No ${title} Available`}
        message={`Every masterpiece starts with a single brick. Watch this space for amazing new ${title}!`}
      />
    );
  }

  return (
    <section ref={ref} className="p-4 flex flex-col">
      <motion.h2
        variants={animations.titleVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="text-3xl text-gray-300 font-extrabold mb-4 text-center pt-6"
      >
        {title}
      </motion.h2>

      <motion.div
        variants={animations.buttonVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex items-center justify-center pb-10"
      >
        <button
          onClick={handleViewAll}
          className="py-2 px-6 rounded-md text-white font-semibold bg-red-600 hover:bg-red-700 transition-colors"
        >
          View All
        </button>
      </motion.div>

      <motion.div
        variants={animations.containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 py-5"
      >
        {products.slice(0, 4).map((product) => (
          <motion.div key={product._id} variants={animations.cardVariants}>
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ProductGrid;
