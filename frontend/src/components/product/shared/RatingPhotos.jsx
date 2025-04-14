import React from "react";
import { ImageIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const RatingPhotos = ({ customerPhotos, setIsGalleryOpen }) => {
  return (
    <Card className="bg-brand-dark/50 border-brand-end/50">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold flex items-center text-white">
            <ImageIcon className="w-5 h-5 mr-2 text-accent" />
            Customer Photos
          </CardTitle>
          {customerPhotos.length > 0 && (
            <button
              onClick={() => setIsGalleryOpen(true)}
              className="text-accent text-sm hover:text-accent/80"
            >
              View all
            </button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {customerPhotos.length > 0 ? (
          <div className="flex gap-3">
            {customerPhotos.slice(0, 4).map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`Customer review ${index + 1}`}
                className="w-32 h-32 object-cover rounded-lg"
              />
            ))}
            {customerPhotos.length > 4 && (
              <div
                className="w-16 h-16 rounded-lg cursor-pointer bg-brand-dark/80 flex items-center justify-center"
                onClick={() => setIsGalleryOpen(true)}
              >
                <span className="text-lg font-semibold text-white">
                  +{customerPhotos.length - 4}
                </span>
              </div>
            )}
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
