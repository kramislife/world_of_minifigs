import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useCarousel } from "@/hooks/Animation/useCarousel";
import { useBanner } from "@/hooks/Home/useBanner";
import { BannerUpload } from "@/components/home/components/BannerUpload";
import { BannerItem } from "@/components/home/components/BannerItem";
import DeleteDialog from "@/components/admin/shared/DeleteDialog";
import SkeletonBanner from "@/components/layout/skeleton/Home/SkeletonBanner";
import { CategoryFallback } from "@/components/product/shared/FallbackStates";

const Banner = () => {
  const { setApi, plugin, options } = useCarousel();
  const {
    bannerData,
    isLoading,
    isError,
    isUploading,
    isDeleting,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    setBannerToDelete,
    handleImageUpload,
    handleDeleteClick,
    handleDeleteConfirm,
    isAdmin,
    hasBanners,
  } = useBanner();

  if (isLoading) {
      return <SkeletonBanner />;
  }

  if (isError)
    return (
      <CategoryFallback
        title="Error Loading Banners"
        message="There was a problem loading the banners. Please try again later."
      />
    );

  // Show fallback when no banners are available for non-admin users
  if (!hasBanners && !isAdmin)
    return (
      <CategoryFallback
        title="No Banners Available"
        message="We're working on some eye-catching banners—check back soon for exciting updates!"
      />
    );

    // Banner Size: 1920 X 800

  return (
    <>
      <div className="max-w-[1920px] mx-auto">
        <Carousel
          plugins={[plugin.current]}
          setApi={setApi}
          opts={options}
          className="w-full h-full relative"
        >
          <CarouselContent className="h-full">
            {isAdmin && (
              <CarouselItem className="basis-full h-full">
                <BannerUpload
                  onUpload={handleImageUpload}
                  isUploading={isUploading}
                  hasBanners={hasBanners}
                />
              </CarouselItem>
            )}

            {bannerData?.banners?.map((banner, index) => (
              <CarouselItem key={banner._id} className="basis-full">
                <BannerItem
                  banner={banner}
                  index={index}
                  isAdmin={isAdmin}
                  onDelete={handleDeleteClick}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {(hasBanners || isAdmin) && bannerData?.banners?.length + (isAdmin ? 1 : 0) > 1 && (
            <>
              <CarouselPrevious className="left-4 text-black" />
              <CarouselNext className="right-4 text-black" />
            </>
          )}
        </Carousel>
      </div>

      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setBannerToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Banner"
        description="Are you sure you want to delete this banner? This action cannot be undone."
        isLoading={isDeleting}
      />
    </>
  );
};

export default Banner;
