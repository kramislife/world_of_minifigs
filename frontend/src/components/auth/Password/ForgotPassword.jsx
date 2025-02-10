import { useState } from "react";
import { useForgotPasswordMutation } from "@/redux/api/authApi";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { loginAnimations } from "@/hooks/Animation/animationConfig";
import Metadata from "@/components/layout/Metadata/Metadata";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await forgotPassword({ email }).unwrap();
      toast.success(result?.message);
      setEmail("");
    } catch (err) {
      toast.error(err?.data?.message || "An error occurred");
    }
  };

  return (
    <>
      <Metadata title="Forgot Password" />
      <div className="min-h-screen flex items-center justify-center bg-brand-gradient p-4">
        <motion.div
          {...loginAnimations.formContainerVariants}
          className="w-full max-w-md p-8 rounded-3xl backdrop-blur-lg shadow-2xl bg-gradient-to-br from-brand-start/40 to-brand-end/40 border border-white/20 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent pointer-events-none" />

          <div className="space-y-6 relative">
            <motion.div {...loginAnimations.headerVariants} className="space-y-3">
              <h1 className="text-3xl font-bold text-white tracking-tight">
                Forgot Password
              </h1>
              <p className="text-light/90 text-sm tracking-wide">
                Enter your email address and we'll send you a link to reset your password
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                {...loginAnimations.inputVariants}
                className="space-y-4"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-darkBrand/50 border-white/20 text-white placeholder:text-gray-400 h-14 w-full rounded-xl focus:ring-2 focus:ring-light/40 focus:border-light/40 transition-all duration-300 text-md px-3"
                  required
                />
              </motion.div>

              <motion.div {...loginAnimations.buttonVariants}>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-r border border-brand hover:bg-brand-gradient text-white h-14 rounded-xl text-md shadow-lg transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">
                    {isLoading ? "Sending..." : "Send Reset Link"}
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

export default ForgotPassword;
