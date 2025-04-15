import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  useGetBannersQuery,
  useCreateBannerMutation,
  useDeleteBannerMutation,
} from "@/redux/api/productApi";
import { useImageUpload } from "@/hooks/ImageUpload/useImageUpload";

export const useBanner = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState(null);

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

  // Use the standardized image upload hook
  const { isUploading, handleImageUpload: processImage } = useImageUpload({
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    onSuccess: async (imageData) => {
      try {
        const response = await createBanner({
          image: imageData,
        }).unwrap();
        toast.success(response.message || "Banner uploaded successfully");
      } catch (error) {
        toast.error(error?.data?.message || "Error uploading banner");
      }
    },
  });

  // Wrapper function to handle file input changes
  const handleImageUpload = (e) => {
    processImage(e);
  };

  const handleDeleteClick = (banner) => {
    setBannerToDelete(banner);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await deleteBanner(bannerToDelete._id).unwrap();
      toast.success(response.message || "Banner deleted successfully");
      setIsDeleteDialogOpen(false);
      setBannerToDelete(null);
    } catch (error) {
      toast.error(error?.data?.message || "Error deleting banner");
    }
  };

  return {
    bannerData,
    isLoading,
    isError,
    isUploading: isUploading || isCreating,
    isDeleting,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    bannerToDelete,
    setBannerToDelete,
    handleImageUpload,
    handleDeleteClick,
    handleDeleteConfirm,
    isAdmin,
    hasBanners,
  };
};
