import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authAnimations } from "@/hooks/Animation/animationConfig";
import { useUpdatePasswordMutation } from "@/redux/api/userApi";

const Settings = () => {
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const formFields = [
    {
      label: "Current Password",
      name: "oldPassword",
      placeholder: "Enter your current password",
      type: "password",
      value: passwordData.oldPassword,
    },
    {
      label: "New Password",
      name: "newPassword",
      placeholder: "Enter your new password",
      type: "password",
      value: passwordData.newPassword,
    },
    {
      label: "Confirm New Password",
      name: "confirmPassword",
      placeholder: "Confirm your new password",
      type: "password",
      value: passwordData.confirmPassword,
    },
  ];

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
          {...authAnimations.formContainerVariants}
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
              {formFields.map((field, index) => (
                <motion.div
                  key={field.name}
                  {...authAnimations.inputVariants}
                  transition={authAnimations.getInputTransition(index)}
                  className="space-y-2"
                >
                  <Label className="text-background">{field.label}</Label>
                  <Input
                    type={field.type}
                    name={field.name}
                    value={field.value}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required
                  />
                </motion.div>
              ))}

              <motion.div {...authAnimations.buttonVariants} className="pt-2">
                <Button
                  type="submit"
                  variant="submit"
                  size="lg"
                  className="w-full"
                  disabled={isLoading}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update Password"
                    )}
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
