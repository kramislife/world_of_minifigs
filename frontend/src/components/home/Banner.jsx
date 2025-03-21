import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useCarousel } from "@/hooks/Animation/useCarousel";
import { Trash2, Upload, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import {
  useGetBannersQuery,
  useCreateBannerMutation,
  useDeleteBannerMutation,
} from "@/redux/api/productApi";
import { toast } from "react-toastify";
import DeleteDialog from "@/components/admin/shared/DeleteDialog";
import LoadingSpinner from "../layout/spinner/LoadingSpinner";

const Banner = () => {
  const { setApi, plugin, options } = useCarousel();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState(null);

  const auth = useSelector((state) => state.auth);
  const isAuthenticated = !!auth?.user;

  const { data: bannerData, isLoading, error } = useGetBannersQuery();
  const [createBanner, { isLoading: isUploading }] = useCreateBannerMutation();
  const [deleteBanner, { isLoading: isDeleting }] = useDeleteBannerMutation();

  const isAdmin =
    isAuthenticated &&
    ["superAdmin", "admin", "employee"].includes(auth?.user?.role);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          await createBanner({ image: reader.result });
          toast.success("Banner uploaded successfully");
        } catch (error) {
          toast.error(error?.data?.message || "Error uploading banner");
          console.error("Error uploading banner:", error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteClick = (banner) => {
    setBannerToDelete(banner);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteBanner(bannerToDelete._id);
      toast.success("Banner deleted successfully");
      setIsDeleteDialogOpen(false);
      setBannerToDelete(null);
    } catch (error) {
      toast.error(error?.data?.message || "Error deleting banner");
      console.error("Error deleting banner:", error);
    }
  };

  // Fallback component when no banners are available


  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error loading banners</div>;

  const hasBanners = bannerData?.banners?.length > 0;

  return (
    <>
      {!hasBanners && !isAdmin ? (
        <EmptyBannerFallback />
      ) : (
        <div className="max-w-[1920px] mx-auto">
          <Carousel
            plugins={[plugin.current]}
            setApi={setApi}
            opts={options}
            className="w-full relative"
          >
            <CarouselContent>
              {isAdmin && (
                <CarouselItem className="basis-full">
                  <label className="flex flex-col items-center justify-center w-full h-[400px] sm:h-[500px] md:h-[800px] cursor-pointer bg-darkBrand/60">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-400">
                      <Upload className="w-12 h-12 mb-4" />
                      <p className="mb-2 text-sm ">
                        <span className="font-semibold">
                          {hasBanners
                            ? "Click to upload Banner"
                            : "Add your first banner"}
                        </span>
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUploading}
                    />
                  </label>
                </CarouselItem>
              )}

              {bannerData?.banners?.map((banner, index) => (
                <CarouselItem key={banner._id} className="basis-full relative">
                  <img
                    src={banner.image.url}
                    alt={`Banner ${index + 1}`}
                    className="w-full object-cover"
                  />
                  {isAdmin && (
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Button
                        variant="secondary"
                        size="icon"
                        onClick={() => handleDeleteClick(banner)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  )}
                </CarouselItem>
              ))}
            </CarouselContent>
            {(hasBanners || isAdmin) && (
              <>
                <CarouselPrevious className="left-4 text-black" />
                <CarouselNext className="right-4 text-black" />
              </>
            )}
          </Carousel>
        </div>
      )}

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
