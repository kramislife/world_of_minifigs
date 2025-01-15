import React, { useEffect } from "react";
import { Card, CardFooter } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import { categoryAnimations } from "@/hooks/Animation/animationConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetCollectionQuery } from "@/redux/api/productApi";
import {
  CategoryFallback,
  PlaceholderImage,
} from "@/components/product/shared/FallbackStates";

const Collections = () => {
  const navigate = useNavigate();
  const ref = React.useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.2,
  });

  const { data, isError, error } = useGetCollectionQuery();

  // Get top 6 collections
  const collections = data?.collections?.slice(2, 8) || [];

  // Show error message if there is an error
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [data, error, isError]);

  const handleCollectionClick = (collectionId) => {
    navigate(`/products?product_collection=${collectionId}`);
  };

  return (
    <>
      <section ref={ref} className="p-4">
        {/* If the collections are available then show the collections */}
        {collections.length > 0 ? (
          <>
            <motion.h2
              variants={categoryAnimations.titleVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl text-gray-300 font-extrabold mb-4 text-center pt-6 header-text"
            >
              Browse by Collections
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center justify-center pb-10"
            >
              <button
                className="py-2 px-6 rounded-md text-white font-semibold bg-red-600 hover:bg-red-700"
                onClick={() => navigate("/collections")}
              >
                View All Collections
              </button>
            </motion.div>

            <motion.div
              variants={categoryAnimations.containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mx-auto mb-8"
            >
              {collections.map((collection) => (
                <motion.div
                  key={collection._id}
                  variants={categoryAnimations.cardVariants}
                  custom={collection._id}
                  onClick={() => handleCollectionClick(collection._id)}
                  className="cursor-pointer"
                >
                  <Card className="overflow-hidden bg-gradient-r border-none rounded-lg cursor-pointer">
                    <motion.div
                      className="relative w-full"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      {collection.image?.url ? (
                        <motion.img
                          src={collection.image.url}
                          alt={collection.name}
                          className="w-full h-[360px] object-fill"
                          {...categoryAnimations.imageVariants}
                        />
                      ) : (
                        // Shows a fallback message if the collection image is not available
                        <PlaceholderImage />
                      )}
                      <motion.div
                        className="absolute inset-0 bg-darkBrand/50"
                        initial="initial"
                        whileHover="hover"
                        variants={categoryAnimations.overlayVariants}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>

                    <motion.div
                      className="relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      <CardFooter className="p-4 bg-gradient-to-t from-black/60">
                        <motion.h3
                          className="text-base sm:text-lg font-semibold text-gray-200 text-center w-full"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          {collection.name}
                        </motion.h3>
                      </CardFooter>
                    </motion.div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </>
        ) : (
          // Shows a fallback message if the collections are not available
          <CategoryFallback
            title="No Collections Available"
            message="We're currently updating our collections. Please check back later for exciting new products."
          />
        )}
      </section>
    </>
  );
};

export default Collections;
