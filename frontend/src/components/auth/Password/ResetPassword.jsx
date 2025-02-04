import { useState } from "react";
import { useResetPasswordMutation } from "@/redux/api/authApi";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { loginAnimations } from "@/hooks/Animation/animationConfig";
import { useParams, useNavigate } from "react-router-dom";
import Metadata from "@/components/layout/Metadata/Metadata";

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

    // First check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Then validate password complexity
    if (!validatePassword(password)) {
      toast.error(
        "Password must be at least 6 characters and contain a letter, a number, and a special character"
      );
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
      
      // Check if error is password-related
      if (errorMessage.toLowerCase().includes('password')) {
        // Password validation errors show in toast
        toast.error(errorMessage);
      } else {
        // Token or other errors show in UI
        setError(errorMessage);
      }
    }
  };

  return (
    <>
      <Metadata title="Reset Password" />
      <div className="min-h-screen flex items-center justify-center bg-brand-gradient p-4">
        <motion.div
          {...loginAnimations.formContainerVariants}
          className="w-full max-w-md p-8 rounded-3xl backdrop-blur-lg shadow-2xl bg-gradient-to-br from-brand-start/40 to-brand-end/40 border border-white/20 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent pointer-events-none" />

          <div className="space-y-6 relative">
            <motion.div {...loginAnimations.headerVariants} className="space-y-3">
              <h1 className="text-3xl font-bold text-white tracking-tight">
                Reset Password
              </h1>
              <p className="text-light/90 text-sm tracking-wide">
                Enter your new password
              </p>
              {error && (
                <p className="text-red-500 text-sm bg-red-100/10 p-3 rounded-lg">
                  {error}
                </p>
              )}
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                {...loginAnimations.inputVariants}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-darkBrand/50 border-white/20 text-white placeholder:text-gray-400 h-14 w-full rounded-xl focus:ring-2 focus:ring-light/40 focus:border-light/40 transition-all duration-300 text-md px-3"
                    required
                    disabled={!!error}
                  />
                </div>
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-darkBrand/50 border-white/20 text-white placeholder:text-gray-400 h-14 w-full rounded-xl focus:ring-2 focus:ring-light/40 focus:border-light/40 transition-all duration-300 text-md px-3"
                  required
                  disabled={!!error}
                />
              </motion.div>

              <motion.div {...loginAnimations.buttonVariants}>
                <button
                  type="submit"
                  disabled={isLoading || !!error}
                  className={`w-full bg-gradient-r border border-brand hover:bg-brand-gradient text-white h-14 rounded-xl text-md shadow-lg transition-all duration-300 relative overflow-hidden group ${
                    error ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <span className="relative z-10">
                    {isLoading ? "Resetting..." : "Reset Password"}
                  </span>
                </button>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ResetPassword;
