import React from "react";
import ProductCard from "./ProductCard";

const ProductSection = ({ products }) => {
  return (
    <div className="col-span-1 lg:col-span-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
