import React, { useEffect } from "react";
import { Card, CardFooter } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import { categoryAnimations } from "@/hooks/animationConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetCollectionQuery } from "@/redux/api/productApi";
import { ImageIcon, Clock } from "lucide-react";
import default_product from "@/assets/default/default_product.jpg";

const PlaceholderImage = () => (
  <div className="w-full h-[360px] bg-brand-gradient flex flex-col items-center justify-center gap-4 border border-slate-700 rounded-lg">
    <ImageIcon className="w-12 h-12 text-slate-600" />
    <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-full">
      <Clock className="w-4 h-4 text-slate-400" />
      <span className="text-sm font-medium text-slate-400">
        Image Coming Soon
      </span>
    </div>
  </div>
);

const Collections = () => {
  const navigate = useNavigate();
  const ref = React.useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.2,
  });

  const { data, isError, error } = useGetCollectionQuery();

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [data, error, isError]);

  const handleCollectionClick = (collectionId) => {
    navigate(`/products?product_collection=${collectionId}`);
  };

  return (
    <div ref={ref} className="p-4">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
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
        {data?.collections?.slice(2, 8).map((collection) => (
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
                    src={collection?.image?.url || default_product}
                    alt={collection.name}
                    className="w-full h-[360px] object-fill"
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
    </div>
  );
};

export default Collections;
