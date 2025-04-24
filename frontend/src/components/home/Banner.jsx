import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BannerUpload } from "./components/BannerUpload";
import { BannerItem } from "./components/BannerItem";
import SkeletonBanner from "@/components/layout/skeleton/Home/SkeletonBanner";
import { FallbackMessage } from "@/components/product/shared/FallbackStates";
import { useBanner } from "@/hooks/Home/useBanner";

const Banner = () => {
  const {
    bannerData,
    isLoading,
    isError,
    isUploading,
    isDeleting,
    isAdmin,
    hasBanners,
    setApi,
    plugin,
    options,
    showCarouselNavigation,
    handleImageUpload,
    handleDeleteConfirm,
    fileInputRef,
    handleFileInputClick,
  } = useBanner();

  if (isLoading) return <SkeletonBanner />;

  if (isError) {
    return (
      <FallbackMessage
        title="Error Loading Banners"
        message="There was a problem loading the banners. Please try again later."
      />
    );
  }

  if (!hasBanners && !isAdmin) {
    return (
      <FallbackMessage
        title="No Banners Available"
        message="We're working on some eye-catching banners—check back soon for exciting updates!"
      />
    );
  }

  return (
    <Carousel plugins={[plugin.current]} setApi={setApi} opts={options}>
      <CarouselContent>
        {isAdmin && (
          <CarouselItem>
            <BannerUpload
              onUpload={handleImageUpload}
              isUploading={isUploading}
              hasBanners={hasBanners}
              fileInputRef={fileInputRef}
              onFileInputClick={handleFileInputClick}
            />
          </CarouselItem>
        )}

        {bannerData?.banners?.map((banner, index) => (
          <CarouselItem key={banner._id}>
            <BannerItem
              banner={banner}
              index={index}
              isAdmin={isAdmin}
              isDeleting={isDeleting}
              onDelete={handleDeleteConfirm}
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      {showCarouselNavigation && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
    </Carousel>
  );
};

export default Banner;
