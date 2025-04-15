import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Phone, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import Metadata from "@/components/layout/Metadata/Metadata";
import LoadingSpinner from "@/components/layout/spinner/LoadingSpinner";
import { useSelector } from "react-redux";
import {
  useUpdateUserMutation,
  useGetSingleUserQuery,
} from "@/redux/api/userApi";
import { toast } from "react-toastify";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const { data: userData, isLoading } = useGetSingleUserQuery(id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const userData = {
      name: formData.get("name"),
      username: formData.get("username"),
      contact_number: formData.get("contact_number"),
      role: formData.get("role"),
      is_verified: formData.get("is_verified") === "on",
      isSuspended: formData.get("isSuspended") === "on",
    };

    try {
      await updateUser({ id, ...userData }).unwrap();
      toast.success("User updated successfully!");
      navigate("/admin/users");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update user");
    }
  };

  if (isLoading || !userData) {
    return (
      <div className="flex justify-center items-center h-48">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <Metadata title="Update User" />
      <div className="p-3 md:p-5">
        <form onSubmit={handleSubmit}>
          <Card className="border-t-4 border-t-accent">
            <CardHeader>
              <CardTitle className="text-2xl">Update User</CardTitle>
            </CardHeader>

            <CardContent className="p-6 space-y-8">
              {/* Basic Information */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label
                    htmlFor="email"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <Mail className="h-5 w-5 text-green-600" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    value={userData?.data?.email}
                    className="bg-gray-100"
                    disabled
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label
                      htmlFor="name"
                      className="flex items-center gap-2 text-lg font-semibold"
                    >
                      <User className="h-5 w-5 text-blue-600" />
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter full name"
                      defaultValue={userData?.data?.name}
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="username"
                      className="flex items-center gap-2 text-lg font-semibold"
                    >
                      <User className="h-5 w-5 text-purple-600" />
                      Username
                    </Label>
                    <Input
                      id="username"
                      name="username"
                      placeholder="Enter username"
                      defaultValue={userData?.data?.username}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label
                      htmlFor="contact_number"
                      className="flex items-center gap-2 text-lg font-semibold"
                    >
                      <Phone className="h-5 w-5 text-orange-600" />
                      Contact Number
                    </Label>
                    <Input
                      id="contact_number"
                      name="contact_number"
                      placeholder="Enter contact number"
                      defaultValue={userData?.data?.contact_number}
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="role"
                      className="flex items-center gap-2 text-lg font-semibold"
                    >
                      <Shield className="h-5 w-5 text-indigo-600" />
                      Role
                    </Label>
                    <Select
                      name="role"
                      required
                      defaultValue={userData?.data?.role}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="customer">Customer</SelectItem>
                        <SelectItem value="employee">Employee</SelectItem>
                        <SelectItem value="seller">Seller</SelectItem>
                        {user?.role === "superAdmin" && (
                          <SelectItem value="admin">Admin</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_verified"
                    name="is_verified"
                    defaultChecked={userData?.data?.is_verified}
                  />
                  <Label htmlFor="is_verified">Verified User</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="isSuspended"
                    name="isSuspended"
                    defaultChecked={userData?.data?.isSuspended}
                  />
                  <Label htmlFor="isSuspended">Suspended</Label>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t">
                <Button
                  type="submit"
                  variant="submit"
                  disabled={isUpdating}
                  className="w-auto"
                >
                  {isUpdating ? "Updating..." : "Update User"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </>
  );
};

export default UpdateUser;
