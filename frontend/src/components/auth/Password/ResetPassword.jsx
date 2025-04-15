import { useState } from "react";
import { useResetPasswordMutation } from "@/redux/api/authApi";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { loginAnimations } from "@/hooks/Animation/animationConfig";
import { useParams, useNavigate } from "react-router-dom";
import Metadata from "@/components/layout/Metadata/Metadata";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const { token } = useParams();
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*_]).{6,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const result = await resetPassword({
        token,
        password,
        confirmPassword,
      }).unwrap();
      toast.success(result?.message);
      navigate("/login");
    } catch (err) {
      const errorMessage = err?.data?.message || "An error occurred";
      setError(errorMessage);
    }
  };

  return (
    <>
      <Metadata title="Reset Password" />
      <div className="px-3 py-12 md:py-7">
        <div className="container mx-auto max-w-md">
          <motion.div
            {...loginAnimations.formContainerVariants}
            className="w-full px-5 py-10 border border-brand-end/50 rounded-2xl"
          >
            <div>
              <motion.div className="mb-8">
                <motion.h1
                  className="text-4xl font-bold"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Reset Password
                </motion.h1>
                <motion.p
                  className="text-gray-400 text-sm mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Enter your new password
                </motion.p>
                {error && (
                  <p className="text-red-500 text-sm bg-red-100/10 p-3 rounded-lg mt-3">
                    {error}
                  </p>
                )}
              </motion.div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <motion.div
                  {...loginAnimations.inputVariants}
                  className="space-y-2"
                >
                  <Label>
                    New Password <span className="text-yellow-400">*</span>
                  </Label>
                  <Input
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={!!error}
                  />
                </motion.div>

                <motion.div
                  {...loginAnimations.inputVariants}
                  className="space-y-2"
                >
                  <Label>
                    Confirm Password <span className="text-yellow-400">*</span>
                  </Label>
                  <Input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={!!error}
                  />
                </motion.div>

                <motion.div
                  {...loginAnimations.buttonVariants}
                  className="pt-2"
                >
                  <Button
                    type="submit"
                    variant="submit"
                    size="lg"
                    disabled={isLoading || !!error}
                  >
                    <span className="relative z-10">
                      {isLoading ? "Resetting..." : "Reset Password"}
                    </span>
                  </Button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
