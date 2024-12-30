import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useGetCollectionQuery } from "@/redux/api/productApi";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/layout/spinner/LoadingSpinner";
import Metadata from "@/components/layout/Metadata/Metadata";
import { ImageIcon } from "lucide-react";
import { Card, CardFooter } from "@/components/ui/card";
import { categoryAnimations } from "@/hooks/animationConfig";

const PlaceholderImage = () => (
  <div className="w-full h-[360px] bg-brand-gradient flex items-center justify-center border-slate-700 rounded-lg">
    <ImageIcon className="w-16 h-16 text-gray-600" />
  </div>
);

const CollectionsPage = () => {
  const navigate = useNavigate();
  const ref = useRef(null);

  const { data, isLoading, isError, error } = useGetCollectionQuery();

  if (isError) {
    toast.error(error?.data?.message);
  }

  const handleCollectionClick = (collectionId) => {
    navigate(`/products?product_collection=${collectionId}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <Metadata title="Collections" />
      <div ref={ref} className="px-4 py-12">
        <motion.h2
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
            },
          }}
          className="text-3xl font-bold mb-8 flex items-center gap-4"
        >
          <div className="w-1 h-8 bg-red-500 rounded" />
          <span>Our Collections</span>
        </motion.h2>

        <motion.div
          variants={categoryAnimations.containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mx-auto mb-8"
        >
          {data?.collections?.map((collection) => (
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
                      className="w-full h-[360px] object-cover"
                      {...categoryAnimations.imageVariants}
                    />
                  ) : (
                    <PlaceholderImage />
                  )}
                  <motion.div
                    className="absolute inset-0 bg-black"
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

        {(!data?.collections || data.collections.length === 0) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <h3 className="text-2xl text-gray-400">
              No collections available at the moment
            </h3>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default CollectionsPage;
