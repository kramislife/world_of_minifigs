import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  useGetBannersQuery,
  useCreateBannerMutation,
  useDeleteBannerMutation,
} from "@/redux/api/productApi";

export const useBanner = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState(null);

  const { data: bannerData, isLoading, isError } = useGetBannersQuery();
  const [createBanner, { isLoading: isUploading }] = useCreateBannerMutation();
  const [deleteBanner, { isLoading: isDeleting }] = useDeleteBannerMutation();

  // Move auth logic from Banner component
  const auth = useSelector((state) => state.auth);
  const isAuthenticated = !!auth?.user;
  const isAdmin =
    isAuthenticated &&
    ["superAdmin", "admin", "employee"].includes(auth?.user?.role);
  const hasBanners = bannerData?.banners?.length > 0;

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const response = await createBanner({
            image: reader.result,
          }).unwrap();
          toast.success(response.message || "Banner uploaded successfully");
        } catch (error) {
          toast.error(error?.data?.message || "Error uploading banner");
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
    isUploading,
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
