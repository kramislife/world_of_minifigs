import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import ProductCard from "@/components/product/ProductCard";
import { PackageX } from "lucide-react";
import { productGridAnimations } from "@/hooks/animationConfig";

// return an empty array if products is not provided
const ProductGrid = ({ title, products, baseUrl }) => {
  const navigate = useNavigate();
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    amount: 0.2,
  });

  // return a best-selling or latest-product category
  const handleViewAll = () => {
    // Extract the category ID from the baseUrl
    const categoryId = baseUrl.split("=")[1];

    // Navigate with the proper query parameter
    navigate(`/products?product_category=${categoryId}`);
  };

  return (
    <section ref={ref} className="p-4 lg:min-h-[90vh] flex flex-col">
      <motion.h2
        variants={productGridAnimations.titleVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="text-3xl text-gray-300 font-extrabold mb-4 text-center pt-6"
      >
        {title}
      </motion.h2>

      {products?.length > 0 ? (
        <>
          <motion.div
            variants={productGridAnimations.buttonVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex items-center justify-center pb-10"
          >
            <button
              onClick={handleViewAll}
              className="py-2 px-6 rounded-md text-white font-semibold bg-red-600 hover:bg-red-700"
            >
              View All
            </button>
          </motion.div>

          {/* return a product grid if the product is available */}
          <motion.div
            variants={productGridAnimations.containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 py-5"
          >
            {products.slice(0, 4).map((product, index) => (
              <motion.div
                key={product._id}
                variants={productGridAnimations.cardVariants(index)}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </>
      ) : (
        // return a message if the product is not available
        <motion.div
          variants={productGridAnimations.cardVariants(0)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex-1 flex flex-col items-center justify-center py-20 px-4 bg-brand/70 rounded-xl border border-gray-700 m-4"
        >
          <PackageX className="w-16 h-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-300 mb-2">
            No Products Available
          </h3>
          <p className="text-gray-400 text-center max-w-md">
            We're currently updating our {title.toLowerCase()}. Please check
            back later.
          </p>
        </motion.div>
      )}
    </section>
  );
};

export default ProductGrid;
