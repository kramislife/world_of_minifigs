import {
  Upload,
  Loader2,
  Shield,
  Phone,
  MapPin,
  PencilLine,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AddressForm from "@/pages/Checkout/components/AddressForm";
import DeleteDialog from "@/components/admin/shared/DeleteDialog";

const ProfileCard = ({
  user,
  handleImageUpload,
  fileInputRef,
  isUploading,
  addresses,
  phoneNumber,
  setPhoneNumber,
  phoneError,
  setPhoneError,
  isPhoneDialogOpen,
  setIsPhoneDialogOpen,
  handlePhoneUpdate,
  isUpdating,
  handleDeleteClick,
  handleDeleteConfirm,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  isDeleting,
  AddressDetails,
  name,
  setName,
  nameError,
  setNameError,
  isNameDialogOpen,
  setIsNameDialogOpen,
  handleNameUpdate,
}) => {
  return (
    <Card className="bg-brand-dark/50 border-none overflow-hidden">
      {/* Gradient Banner */}
      <div className="h-32 bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600"></div>

      <CardContent className="relative p-0 -mt-16">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full ring-4 ring-accent bg-accent flex items-center justify-center overflow-hidden">
              {user?.profile_picture?.url ? (
                <img
                  src={user.profile_picture.url}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-5xl text-foreground font-semibold">
                  {user?.name?.[0]?.toUpperCase()}
                </span>
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-200 rounded-full"
            >
              {isUploading ? (
                <Loader2 className="w-6 h-6 text-white animate-spin" />
              ) : (
                <Upload className="w-6 h-6 text-white" />
              )}
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
          </div>

          {/* User Info */}
          <div className="text-center mt-5 space-y-1">
            <div className="group relative inline-block">
              <h2 className="text-2xl font-semibold text-white">
                {user?.name}
              </h2>
              <button
                onClick={() => {
                  setName(user?.name || "");
                  setIsNameDialogOpen(true);
                }}
                className="absolute -right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <PencilLine className="w-4 h-4 text-blue-500" />
              </button>
            </div>
            <p className="text-sm text-gray-400">{user?.email}</p>
            <div className="flex items-center justify-center gap-2 py-3">
              {user?.is_verified && (
                <Badge
                  variant="success"
                  className="flex items-center gap-1.5 text-sm"
                >
                  <Shield className="w-4 h-4" />
                  <span>Verified Account</span>
                </Badge>
              )}
              <Badge variant="info" className="capitalize text-sm">
                {user?.role}
              </Badge>
            </div>
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="space-y-3 p-5">
          {/* Phone Number */}
          <div className="bg-brand-dark/50 rounded-md border border-brand-end/50 p-5">
            <div className="group flex items-center justify-between">
              <d iv className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-accent" />
                <div>
                  <p className="text-md text-gray-400">Phone Number</p>
                  <p className="text-white mt-1 text-sm">
                    {user?.contact_number || "No phone number added"}
                  </p>
                </div>
              </d>
              <button
                onClick={() => {
                  setPhoneNumber(user?.contact_number || "");
                  setIsPhoneDialogOpen(true);
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <PencilLine className="w-4 h-4 text-blue-500" />
              </button>
            </div>
          </div>

          {/* Addresses Section */}
          <div className="bg-brand-dark/50 rounded-md border border-brand-end/50 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className=" bg-darkBrand/70 rounded-lg">
                  <MapPin className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-md text-gray-400"> Addresses</p>
                </div>
              </div>
              <AddressForm
                userName={user?.name}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                buttonText="Add Addresses"
              />
            </div>

            {/* Address List */}
            <div className="space-y-3 mt-4">
              {addresses?.length > 0 ? (
                addresses.map((address) => (
                  <div
                    key={address._id}
                    className={`group relative rounded-lg transition-all duration-200 cursor-pointer p-4 ${
                      address.is_default
                        ? "bg-darkBrand/20 border border-blue-500/50"
                        : "hover:bg-darkBrand/30 border border-transparent hover:border-white/5"
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="flex-grow">
                        <div className="flex items-center gap-2">
                          <span className="font-medium capitalize text-white">
                            {address.name || "Other"}
                          </span>
                          {address.is_default && (
                            <Badge variant="info" className="text-xs">
                              Default
                            </Badge>
                          )}
                        </div>
                        <AddressDetails addr={address} />
                      </div>
                      <div className="absolute right-4 top-6 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2">
                        <AddressForm
                          isEdit={true}
                          editAddress={address}
                          userName={user?.name}
                          className="p-1.5 rounded-lg hover:bg-gray-600/50"
                        />
                        <DeleteDialog
                          onConfirm={() => handleDeleteConfirm(address._id)}
                          title="Delete Address"
                          itemToDelete={address.name || "this address"}
                          isLoading={isDeleting}
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <MapPin className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                  <p className="text-gray-400">No addresses added yet</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Add your first delivery address
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Phone Update Dialog */}
        <Dialog open={isPhoneDialogOpen} onOpenChange={setIsPhoneDialogOpen}>
          <DialogContent className="bg-brand-start border-none">
            <DialogHeader>
              <DialogTitle className="text-white">
                Update Phone Number
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div>
                <Input
                  type="tel"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    setPhoneError("");
                  }}
                />
                {phoneError && (
                  <p className="text-sm text-red-400">{phoneError}</p>
                )}
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsPhoneDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handlePhoneUpdate}
                  disabled={isUpdating}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isUpdating ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : null}
                  Save
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Name Update Dialog */}
        <Dialog open={isNameDialogOpen} onOpenChange={setIsNameDialogOpen}>
          <DialogContent className="bg-brand-start border-none">
            <DialogHeader>
              <DialogTitle className="text-white">Update Name</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setNameError("");
                  }}
                />
                {nameError && (
                  <p className="text-sm text-red-400">{nameError}</p>
                )}
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsNameDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleNameUpdate}
                  disabled={isUpdating}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isUpdating ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : null}
                  Save
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
