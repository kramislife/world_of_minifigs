import React, { useEffect, useState } from "react";
import { ImageIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const RatingPhotos = ({ customerPhotos, setIsGalleryOpen }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 640);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const visibleCount = isMobile ? 3 : 6;
  const visiblePhotos = customerPhotos.slice(0, visibleCount);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold flex items-center text-background">
            <ImageIcon className="w-5 h-5 mr-2 text-accent" />
            Customer Photos
          </CardTitle>
          {customerPhotos.length > visibleCount && (
            <Button
              variant="link"
              onClick={() => setIsGalleryOpen(true)}
              className="text-accent"
            >
              View all
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {customerPhotos.length > 0 ? (
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {visiblePhotos.map((image, index) => {
              const isLastVisible =
                index === visibleCount - 1 &&
                customerPhotos.length > visibleCount;

              return (
                <div
                  key={index}
                  className="relative cursor-pointer aspect-square"
                  onClick={() => setIsGalleryOpen(true)}
                >
                  <img
                    src={image.url}
                    alt={`Customer review ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  {isLastVisible && (
                    <div className="absolute inset-0 bg-black bg-opacity-60 rounded-lg flex items-center justify-center">
                      <span className="text-lg font-semibold text-white">
                        +{customerPhotos.length - visibleCount}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-gray-400">
            <ImageIcon className="w-12 h-12 mb-3 opacity-50" />
            <p className="text-sm">No customer photos yet</p>
            <p className="text-xs mt-1">
              Be the first to share your experience!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RatingPhotos;
