import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

const CollectionGridSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto mb-8"
    >
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="overflow-hidden bg-gradient-r border-none rounded-lg h-[280px] relative">
            <Skeleton className="w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <Skeleton className="h-6 w-3/4 mx-auto" />
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CollectionGridSkeleton;
