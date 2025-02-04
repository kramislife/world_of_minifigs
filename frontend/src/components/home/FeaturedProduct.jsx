import React, { useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { featuredProductAnimations } from "@/hooks/Animation/animationConfig";
import {
  useGetCollectionQuery,
  useGetSubCollectionsQuery,
} from "@/redux/api/productApi";
import { useNavigate } from "react-router-dom";
import {
  CategoryFallback,
  PlaceholderImage,
} from "@/components/product/shared/FallbackStates";
import { toast } from "react-toastify";

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const { data, isError, error } = useGetCollectionQuery();
  const {
    data: subCollectionsData,
    isError: isSubError,
    error: subError,
  } = useGetSubCollectionsQuery();

  // Get only featured collections
  const featuredCollections =
    data?.collections?.filter((c) => c.isFeatured) || [];

  // Show error message if there is an error
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSubError) {
      toast.error(subError?.data?.message);
    }
  }, [error, isError, subError, isSubError]);

  const handleCollectionClick = (collection) => {
    if (!collection?._id) {
      toast.error("Invalid collection");
      return;
    }

    const hasSubCollections = subCollectionsData?.subcollections?.some(
      (sub) => sub?.collection?._id === collection._id
    );

    // Always navigate to collections route if there are subcollections
    if (hasSubCollections) {
      navigate(`/collections/${collection._id}`);
    } else {
      // Navigate to products route if no subcollections
      navigate(`/products?product_collection=${collection._id}`);
    }
  };

  return (
    <>
      <section ref={ref} className="p-4">
        {/* If the featured collections are available then show the featured collections */}
        {featuredCollections.length > 0 ? (
          <>
            <motion.h2
              variants={featuredProductAnimations.titleVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-3xl text-gray-300 font-extrabold mb-4 text-center pt-6 header-text"
            >
              Featured Collections
            </motion.h2>
            <motion.div
              variants={featuredProductAnimations.containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-3 pt-4 cursor-pointer"
            >
              {/* Show featured collections */}
              {featuredCollections.map((collection) => (
                <motion.div
                  key={collection._id}
                  variants={featuredProductAnimations.imageVariants}
                  className="relative overflow-hidden group"
                  onClick={() => handleCollectionClick(collection)}
                >
                  {/* Show collection image */}
                  {collection.image?.url ? (
                    <motion.img
                      src={collection.image.url}
                      alt={collection.name}
                      className="w-full lg:h-[80vh] h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                    />
                  ) : (
                    // Show placeholder image if collection image is not available
                    <PlaceholderImage height="h-[90vh]" />
                  )}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-darkBrand/50 flex items-center justify-center opacity-0 group-hover:opacity-100"
                  >
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-white mb-4">
                        {collection.name}
                      </h3>
                      <button className="bg-red-600 hover:bg-button/85 text-white px-6 py-2 rounded-md">
                        {subCollectionsData?.subcollections?.some(
                          (sub) => sub?.collection?._id === collection._id
                        )
                          ? "View Sub-Collections"
                          : "View Collection"}
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </>
        ) : (
          // Shows a fallback message if the featured collections are not available
          <CategoryFallback
            title="No Featured Collections Available"
            message="We're currently updating our featured collections. Please check back later for exciting new products."
          />
        )}
      </section>
    </>
  );
};

export default FeaturedProducts;
