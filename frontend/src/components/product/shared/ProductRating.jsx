import React, { useMemo } from 'react';
import { Quote, User } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import StarRating from "@/components/product/shared/StarRating";

const ProductRating = ({ product }) => {
  if (!product) {
    return null;
  }

  const distribution = [
    { stars: 5, count: 0 },
    { stars: 4, count: 0 },
    { stars: 3, count: 0 },
    { stars: 2, count: 0 },
    { stars: 1, count: 0 },
  ];

  return (
    <div className="bg-brand-gradient py-12 px-6">
      <div>
        <h2 className="text-3xl font-semibold mb-8 flex items-center gap-4">
          <div className="w-1 h-8 bg-red-500 rounded" />
          <span>Ratings & Reviews</span>
        </h2>

        <div className="flex flex-col md:flex-row justify-between mb-16 px-10 pt-10">
          {/* Average Rating Display */}
          <div className="flex flex-col items-center justify-center">
            <div className="text-5xl font-semibold mb-4">
              {product?.ratings}<span className="text-3xl text-gray-400">/5.0</span>
            </div>
            <div className="mb-3">
              <StarRating rating={product?.ratings} />
            </div>
            <div className="text-sm text-gray-400">
              ({product?.reviews?.length}) reviews
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="flex-1 w-full max-w-2xl space-y-3">
            {distribution.map((rating) => (
              <div key={rating.stars} className="flex items-center gap-4">
                <span className="w-4 text-gray-400">{rating.stars}</span>
                <div className="flex gap-2 items-center flex-1">
                  <StarRating rating={rating.stars} />
                  <Progress 
                    value={product?.reviews?.length > 0 ? (rating.count / product?.reviews?.length * 100) : 0} 
                    className={`h-2 flex-1 bg-gray-700/50 ${
                      rating.count > 0 
                        ? '[&>div]:bg-yellow-400' 
                        : '[&>div]:bg-gray-600'
                    }`}
                  />
                  <span className="text-sm text-gray-400 w-8">
                    ({rating.count})
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Write Review Button */}
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-xl font-semibold mb-4">Share your Experience</h3>
            <Button 
              variant="default" 
              size="lg" 
              className="bg-[#1a2c4d] hover:bg-[#243a61] text-white border border-gray-600"
            >
              Write a Review
            </Button>
          </div>
        </div>

        {/* Reviews List */}
        <div className="mt-16 space-y-8">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
            <Quote className="w-6 h-6 text-red-500" />
            Customer Reviews
          </h3>
          
          {product?.reviews && product.reviews.length > 0 ? (
            product.reviews.map((review) => (
              <Card key={review?.id} className="bg-brand/70 border-none text-white p-8 rounded-xl shadow-lg hover:bg-gray-800/70 transition-all duration-300">
                <div className="flex items-start gap-6">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-gray-700 text-gray-300">
                      <User className="w-6 h-6" />
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-semibold text-lg">{review?.author}</div>
                        <div className="flex items-center gap-3">
                          <StarRating rating={review?.rating} />
                          <span className="text-sm text-gray-400">
                            {review?.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {review?.content}
                    </p>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="bg-brand/70 border-none text-white p-8 rounded-xl shadow-lg text-center">
              <p className="text-gray-300 text-lg">No reviews yet. Be the first to share your experience!</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductRating;