import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { toast } from "react-toastify";
import {
  useGetCollectionQuery,
  useGetSubCollectionsQuery,
} from "@/redux/api/productApi";
import CollectionGrid from "@/pages/Collections/CollectionGrid";
import { CategoryFallback } from "@/components/product/shared/FallbackStates";
import { categoryAnimations } from "@/hooks/Animation/animationConfig";

const Collections = () => {
  const navigate = useNavigate();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const { data, isError, error } = useGetCollectionQuery();
  const {
    data: subCollectionsData,
    isError: isSubError,
    error: subError,
  } = useGetSubCollectionsQuery();

  // Get non-featured collections with null check
  const collections =
    data?.collections?.filter((c) => !c.isFeatured)?.slice(0, 6) || [];

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Failed to fetch collections");
    }
    if (isSubError) {
      toast.error(subError?.data?.message || "Failed to fetch sub-collections");
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

    navigate(`/collections/${collection._id}`);
  };

  return (
    <section ref={ref} className="p-4">
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

          <CollectionGrid
            collections={collections}
            onCollectionClick={handleCollectionClick}
            isInView={isInView}
          />
        </>
      ) : (
        <CategoryFallback
          title="No Collections Available"
          message="We're currently updating our collections. Please check back later for exciting new products."
        />
      )}
    </section>
  );
};

export default Collections;
