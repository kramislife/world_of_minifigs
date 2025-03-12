import React from "react";
import { useProfileData } from "@/hooks/Profile/useProfileData";
import ProfileCard from "./components/ProfileCard";
import ActivityStats from "./components/ActivityStats";
import ProfileProgress from "./components/ProfileProgress";
import RecentActivity from "./components/RecentActivity";

const Profile = () => {
  const {
    user,
    handleImageUpload,
    fileInputRef,
    isUploading,
    stats,
    setIsCartOpen,
    addresses,
    orders,
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
    name,
    setName,
    nameError,
    setNameError,
    isNameDialogOpen,
    setIsNameDialogOpen,
    handleNameUpdate,
  } = useProfileData();

  const AddressDetails = ({ addr }) => (
    <div className="mt-2">
      <div className="flex gap-2 items-start">
        <span className="text-blue-400 text-sm font-medium whitespace-nowrap mt-1">
          {addr.contact_number}
        </span>
        <span className="text-gray-500 mt-0.5">•</span>
        <span className="text-gray-300 text-sm leading-loose">
          {formatAddress(addr)}
        </span>
      </div>
    </div>
  );

  return (
    <div className="lg:p-10 p-3 max-w-8xl">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Left Column - Profile & Stats */}
        <div className="space-y-5 lg:col-span-2">
          <ProfileCard
            user={user}
            handleImageUpload={handleImageUpload}
            fileInputRef={fileInputRef}
            isUploading={isUploading}
            addresses={addresses}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            phoneError={phoneError}
            setPhoneError={setPhoneError}
            isPhoneDialogOpen={isPhoneDialogOpen}
            setIsPhoneDialogOpen={setIsPhoneDialogOpen}
            handlePhoneUpdate={handlePhoneUpdate}
            isUpdating={isUpdating}
            handleDeleteClick={handleDeleteClick}
            handleDeleteConfirm={handleDeleteConfirm}
            isDeleteDialogOpen={isDeleteDialogOpen}
            setIsDeleteDialogOpen={setIsDeleteDialogOpen}
            selectedAddressId={selectedAddressId}
            isDeleting={isDeleting}
            AddressDetails={AddressDetails}
            name={name}
            setName={setName}
            nameError={nameError}
            setNameError={setNameError}
            isNameDialogOpen={isNameDialogOpen}
            setIsNameDialogOpen={setIsNameDialogOpen}
            handleNameUpdate={handleNameUpdate}
          />
          <ActivityStats stats={stats} setIsCartOpen={setIsCartOpen} />
        </div>

        {/* Right Column - Main Content */}
        <div className="lg:col-span-3 space-y-5">
          <ProfileProgress user={user} addresses={addresses} orders={orders} />
          <RecentActivity orders={orders} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
