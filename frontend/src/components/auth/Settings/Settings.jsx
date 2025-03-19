import React, { useState } from "react";
import { useUpdatePasswordMutation } from "@/redux/api/userApi";
import { toast } from "react-toastify";
import { Key, Save } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const Settings = () => {
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await updatePassword(passwordData).unwrap();
      toast.success(result?.message || "Password updated successfully");

      // Reset form
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update password");
    }
  };

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-light">Account Settings</h1>

      <div className="max-w-2xl mx-auto">
        <Card className="bg-darkBrand border-none">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Key className="h-5 w-5 text-blue-500" />
              <CardTitle className="text-light">Change Password</CardTitle>
            </div>
            <CardDescription className="text-gray-400">
              Update your password to keep your account secure. Your new
              password must be at least 6 characters and include at least one
              letter, one number, and one special character.
            </CardDescription>
          </CardHeader>

          <Separator className="bg-gray-800" />

          <form onSubmit={handleSubmit}>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="oldPassword" className="text-gray-300">
                  Current Password
                </Label>
                <Input
                  id="oldPassword"
                  name="oldPassword"
                  type="password"
                  value={passwordData.oldPassword}
                  onChange={handleChange}
                  className="bg-brand/60 border-gray-700 text-light"
                  placeholder="Enter your current password"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-gray-300">
                  New Password
                </Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={handleChange}
                  className="bg-brand/60 border-gray-700 text-light"
                  placeholder="Enter your new password"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-300">
                  Confirm New Password
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={handleChange}
                  className="bg-brand/60 border-gray-700 text-light"
                  placeholder="Confirm your new password"
                />
              </div>
            </CardContent>

            <CardFooter className="flex justify-end pt-2 pb-6">
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
              >
                {isLoading ? "Updating..." : "Update Password"}
                <Save className="h-4 w-4" />
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
