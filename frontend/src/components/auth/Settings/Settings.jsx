import React, { useState } from "react";
import { useUpdatePasswordMutation } from "@/redux/api/userApi";
import { toast } from "react-toastify";
import { Key, Save } from "lucide-react";
import { motion } from "framer-motion";
import { loginAnimations } from "@/hooks/Animation/animationConfig";
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
    <div className="px-3 py-10 md:py-7">
      <div className="container mx-auto max-w-xl">
        <motion.div
          {...loginAnimations.formContainerVariants}
          className="w-full px-5 py-10 border border-brand-end/50 rounded-2xl"
        >
          <div>
            <motion.div className="mb-8">
              <motion.div className="flex items-center gap-2">
                <motion.h1
                  className="text-3xl md:text-4xl font-bold"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Change Password
                </motion.h1>
              </motion.div>
              <motion.p
                className="text-gray-400 text-sm mt-3 leading-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Update your password to keep your account secure. Your new
                password must be at least 6 characters and include at least one
                letter, one number, and one special character.
              </motion.p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <motion.div
                {...loginAnimations.inputVariants}
                transition={loginAnimations.emailInputTransition}
                className="space-y-2"
              >
                <Label>
                  Current Password <span className="text-yellow-400">*</span>
                </Label>
                <Input
                  type="password"
                  name="oldPassword"
                  value={passwordData.oldPassword}
                  onChange={handleChange}
                  placeholder="Enter your current password"
                  required
                />
              </motion.div>

              <motion.div
                {...loginAnimations.inputVariants}
                transition={loginAnimations.passwordInputTransition}
                className="space-y-2"
              >
                <Label>
                  New Password <span className="text-yellow-400">*</span>
                </Label>
                <Input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handleChange}
                  placeholder="Enter your new password"
                  required
                />
              </motion.div>

              <motion.div
                {...loginAnimations.inputVariants}
                transition={loginAnimations.passwordInputTransition}
                className="space-y-2"
              >
                <Label>
                  Confirm New Password{" "}
                  <span className="text-yellow-400">*</span>
                </Label>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your new password"
                  required
                />
              </motion.div>

              <motion.div {...loginAnimations.buttonVariants} className="pt-2">
                <Button
                  type="submit"
                  variant="submit"
                  size="lg"
                  disabled={isLoading}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isLoading ? "Updating..." : "Update Password"}
                  </span>
                </Button>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
