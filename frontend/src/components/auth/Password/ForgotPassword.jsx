import { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Metadata from "@/components/layout/Metadata/Metadata";
import { authAnimations } from "@/hooks/Animation/animationConfig";
import { useForgotPasswordMutation } from "@/redux/api/authApi";
import { Loader2 } from "lucide-react";

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
      <div className="px-3 py-10">
        <div className="container mx-auto max-w-md">
          <motion.div
            {...authAnimations.formContainerVariants}
            className="w-full md:px-5 py-10 md:border border-brand-end/50 rounded-2xl"
          >
            <div>
              <motion.div className="mb-8">
                <motion.h1
                  className="md:text-4xl text-3xl font-bold"
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
                  {...authAnimations.inputVariants}
                  transition={authAnimations.getInputTransition(0)}
                  className="space-y-2"
                >
                  <Label className="text-background">Email Address</Label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </motion.div>

                <motion.div {...authAnimations.buttonVariants} className="pt-2">
                  <Button
                    type="submit"
                    variant="submit"
                    size="lg"
                    className="w-full flex items-center justify-center gap-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending Reset Link...
                      </>
                    ) : (
                      "Send Reset Link"
                    )}
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
