import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

const FeaturedProductSkeleton = () => (
  <section className="py-16">
    <div className="max-w-[1920px] mx-auto">
      {/* Title skeleton */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <Skeleton className="h-10 w-72 mx-auto mb-8" />
      </motion.div>

      {/* Featured collections grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid gap-6 pt-4"
      >
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.2 }}
            className="relative overflow-hidden group"
          >
            {/* Collection image skeleton */}
            <Skeleton className="w-full h-[400px] sm:h-[500px] md:h-[600px] rounded-lg" />

            {/* Overlay content skeleton */}
            <div className="absolute inset-0 flex items-center justify-center bg-darkBrand/20">
              <div className="text-center space-y-4">
                <Skeleton className="h-8 w-48 mx-auto" />
                <Skeleton className="h-10 w-44 mx-auto rounded-full" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default FeaturedProductSkeleton;
