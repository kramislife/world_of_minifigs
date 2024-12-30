import React from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

const ProductSection = ({ products }) => {
  return (
    <div className="col-span-1 lg:col-span-3">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </motion.div>
    </div>
  );
};

export default ProductSection;
