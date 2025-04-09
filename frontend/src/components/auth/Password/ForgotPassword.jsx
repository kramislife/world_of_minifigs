import { useState } from "react";
import { useForgotPasswordMutation } from "@/redux/api/authApi";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { loginAnimations } from "@/hooks/Animation/animationConfig";
import Metadata from "@/components/layout/Metadata/Metadata";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";

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
                  Forgot Password
                </motion.h1>
                <motion.p
                  className="text-gray-400 text-sm mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Enter your email address and we'll send you a link to reset
                  your password
                </motion.p>
              </motion.div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <motion.div
                  {...loginAnimations.inputVariants}
                  className="space-y-2"
                >
                  <Label>
                    Email Address <span className="text-yellow-400">*</span>
                  </Label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </motion.div>

                <motion.div
                  {...loginAnimations.buttonVariants}
                  className="pt-2"
                >
                  <Button type="submit" variant="submit" size="lg" disabled={isLoading}>
                    <span className="relative z-10">
                      {isLoading ? "Sending..." : "Send Reset Link"}
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

export default ForgotPassword;
