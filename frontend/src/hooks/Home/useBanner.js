import { useRef } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  useGetBannersQuery,
  useCreateBannerMutation,
  useDeleteBannerMutation,
} from "@/redux/api/productApi";
import { useImageUpload } from "@/hooks/ImageUpload/useImageUpload";
import { useCarousel } from "@/hooks/Animation/useCarousel";

export const useBanner = () => {
  const fileInputRef = useRef(null);
  const { setApi, plugin, options } = useCarousel();

  // Queries and Mutations
  const { data: bannerData, isLoading, isError } = useGetBannersQuery();
  const [createBanner, { isLoading: isCreating }] = useCreateBannerMutation();
  const [deleteBanner, { isLoading: isDeleting }] = useDeleteBannerMutation();

  // Auth logic
  const auth = useSelector((state) => state.auth);
  const isAuthenticated = !!auth?.user;
  const isAdmin =
    isAuthenticated &&
    ["superAdmin", "admin", "employee"].includes(auth?.user?.role);
  const hasBanners = bannerData?.banners?.length > 0;

  // Image upload logic
  const { isUploading, handleImageUpload: processImage } = useImageUpload({
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    onSuccess: async (imageData) => {
      try {
        const response = await createBanner({ image: imageData }).unwrap();
        toast.success(response.message || "Banner uploaded successfully");
      } catch (error) {
        toast.error(error?.data?.message || "Error uploading banner");
      }
    },
  });

  const handleImageUpload = (e) => {
    processImage(e);
  };

  const handleDeleteConfirm = async (bannerId) => {
    try {
      const response = await deleteBanner(bannerId).unwrap();
      toast.success(response.message || "Banner deleted successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Error deleting banner");
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  // Computed values
  const showCarouselNavigation =
    (hasBanners || isAdmin) &&
    bannerData?.banners?.length + (isAdmin ? 1 : 0) > 1;

  return {
    // State
    bannerData,
    isLoading,
    isError,
    isUploading: isUploading || isCreating,
    isDeleting,
    isAdmin,
    hasBanners,

    // Refs
    fileInputRef,

    // Carousel
    setApi,
    plugin,
    options,
    showCarouselNavigation,

    // Handlers
    handleImageUpload,
    handleDeleteConfirm,
    handleFileInputClick,
  };
};
