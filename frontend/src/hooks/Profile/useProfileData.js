import {
  useGetMeQuery,
  useGetUserAddressesQuery,
  useUpdateProfilePictureMutation,
  useUpdateProfileMutation,
  useDeleteAddressMutation,
} from "@/redux/api/userApi";
import { useGetAllOrdersQuery } from "@/redux/api/orderApi";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { formatDistanceToNow } from "date-fns";
import { useImageUpload } from "@/hooks/ImageUpload/useImageUpload";

export const useProfileData = () => {
  const {
    data: user,
    isLoading: isUserLoading,
    error: userError,
  } = useGetMeQuery();
  const { data: addresses } = useGetUserAddressesQuery();
  const { data: orders } = useGetAllOrdersQuery();
  const { cartItems } = useSelector((state) => state.cart);
  const fileInputRef = useRef(null);

  const [updateProfilePicture, { isLoading: isApiUploading }] =
    useUpdateProfilePictureMutation();

  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [isPhoneDialogOpen, setIsPhoneDialogOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [deleteAddress, { isLoading: isDeleting }] = useDeleteAddressMutation();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [isNameDialogOpen, setIsNameDialogOpen] = useState(false);

  const { handleImageUpload: processImage, isUploading: isCompressing } =
    useImageUpload({
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
      maxFileSize: 2 * 1024 * 1024,
      onSuccess: async (imageData) => {
        try {
          const formData = { avatar: imageData };
          await updateProfilePicture(formData).unwrap();
          toast.success("Profile picture updated successfully");
        } catch (err) {
          toast.error(err?.data?.message || "Failed to update profile picture");
        }
      },
    });

  const isUploading = isCompressing || isApiUploading;

  const handleImageUpload = (e) => {
    processImage(e);
  };

  const handlePhoneUpdate = async () => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setPhoneError("Please enter a valid phone number");
      return;
    }

    try {
      await updateProfile({
        contact_number: phoneNumber,
      }).unwrap();

      toast.success("Phone number updated successfully");
      setIsPhoneDialogOpen(false);
      setPhoneNumber("");
      setPhoneError("");
    } catch (error) {
      toast.error(error.data?.message || "Failed to update phone number");
    }
  };

  const handleDeleteClick = (addressId) => {
    setSelectedAddressId(addressId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteAddress(selectedAddressId).unwrap();
      toast.success("Address deleted successfully");
      setIsDeleteDialogOpen(false);
      setSelectedAddressId(null);
    } catch (error) {
      toast.error(error.data?.message || "Failed to delete address");
    }
  };

  const formatAddress = (addr) => {
    if (!addr) return "No address added";
    const parts = [
      addr.address_line1,
      addr.address_line2,
      addr.city,
      addr.state,
      addr.postal_code,
      addr.country,
    ].filter(Boolean);
    return parts.join(", ");
  };

  const stats = {
    totalOrders: orders?.data?.length || 0,
    cartItems: cartItems.length,
    reviewsGiven:
      orders?.data?.filter((order) => order.isReviewed)?.length || 0,
    totalSpend:
      orders?.data?.reduce((total, order) => total + order.totalPrice, 0) || 0,
  };

  const profileTasks = [
    { task: "Add profile picture", completed: !!user?.profile_picture?.url },
    { task: "Add phone number", completed: !!user?.contact_number },
    { task: "Add shipping address", completed: !!addresses?.length },
    { task: "Make your first purchase", completed: !!orders?.data?.length },
    {
      task: "Write a review",
      completed: orders?.data?.some((order) => order.isReviewed),
    },
  ];

  const formatDate = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  const getActivityDetails = (type, status) => {
    switch (type) {
      case "order":
        return {
          color:
            status === "Delivered"
              ? "text-green-400 bg-green-500/10"
              : status === "Processing"
              ? "text-blue-400 bg-blue-500/10"
              : status === "Cancelled"
              ? "text-red-400 bg-red-500/10"
              : "text-purple-400 bg-purple-500/10",
          statusColor:
            status === "Delivered"
              ? "text-green-400"
              : status === "Processing"
              ? "text-blue-400"
              : status === "Cancelled"
              ? "text-red-400"
              : "text-purple-400",
        };
      case "review":
        return {
          color: "text-yellow-400 bg-yellow-500/10",
          statusColor: "text-yellow-400",
        };
      default:
        return {
          color: "text-gray-400 bg-gray-500/10",
          statusColor: "text-gray-400",
        };
    }
  };

  const generateActivities = () => {
    if (!orders?.data) return [];

    const activities = [];

    orders.data.forEach((order) => {
      activities.push({
        type: "order",
        title: `Order ${order.orderStatus}`,
        description: `Order #${order._id.slice(-8)} - ${
          order.orderItems.length
        } item${order.orderItems.length > 1 ? "s" : ""}`,
        status: order.orderStatus,
        date: order.createdAt,
        amount: order.totalPrice,
      });

      if (order.isReviewed) {
        activities.push({
          type: "review",
          title: "Review Posted",
          description: `Reviewed order #${order._id.slice(-8)}`,
          date: order.updatedAt,
        });
      }
    });

    return activities.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const handleNameUpdate = async () => {
    if (!name.trim()) {
      setNameError("Name cannot be empty");
      return;
    }

    if (name.trim().length < 2) {
      setNameError("Name must be at least 2 characters long");
      return;
    }

    try {
      await updateProfile({
        name: name.trim(),
      }).unwrap();

      toast.success("Name updated successfully");
      setIsNameDialogOpen(false);
      setName("");
      setNameError("");
    } catch (error) {
      toast.error(error.data?.message || "Failed to update name");
    }
  };

  return {
    user,
    isUserLoading,
    userError,
    addresses,
    orders,
    stats,
    profileTasks,
    handleImageUpload,
    fileInputRef,
    isUploading,
    phoneNumber,
    setPhoneNumber,
    phoneError,
    setPhoneError,
    isPhoneDialogOpen,
    setIsPhoneDialogOpen,
    handlePhoneUpdate,
    isUpdating,
    formatAddress,
    handleDeleteClick,
    handleDeleteConfirm,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    selectedAddressId,
    isDeleting,
    formatDate,
    getActivityDetails,
    generateActivities,
    name,
    setName,
    nameError,
    setNameError,
    isNameDialogOpen,
    setIsNameDialogOpen,
    handleNameUpdate,
  };
};
