import { motion } from "framer-motion";
import LoginImg from "@/assets/authAssets/Login.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { loginAnimations } from "@/hooks/Animation/animationConfig";
import { useEffect, useState } from "react";
import { useLoginMutation } from "@/redux/api/authApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Metadata from "@/components/layout/Metadata/Metadata";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const Login = () => {
  const [email_username, setEmail_username] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // Get the saved product info and action, ensure from is a string
  const from =
    typeof location.state?.from === "string" ? location.state.from : "/";
  const returnTo = location.state?.returnTo;

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (isAuthenticated) {
      // If returning to product page after voting, navigate back
      if (returnTo === "product" && location.state?.action === "vote") {
        navigate(from);
        return;
      }

      // Handle admin/employee routing
      const isAdminOrEmployee = ["admin", "employee", "superAdmin"].includes(
        user?.role
      );

      // Ensure from is a string before using startsWith
      const redirectPath =
        typeof from === "string" && from.startsWith("/admin")
          ? isAdminOrEmployee
            ? from
            : "/"
          : isAdminOrEmployee
          ? "/admin"
          : from;

      navigate(redirectPath);
    }
  }, [isAuthenticated, user, navigate, from, returnTo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const result = await login({
        email_username,
        password,
      }).unwrap();
      toast.success(result?.message);
    } catch (err) {
      toast.error(err?.data?.message || "An error occurred during login");
    }
  };

  return (
    <>
      <Metadata title="Login" />
      <div className="px-3 py-12 md:py-7">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-2 max-w-7xl">
          {/* Left side - Login Form */}
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
                  Welcome back!
                </motion.h1>
                <motion.p
                  className="text-gray-400 text-sm mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Sign in to your account to continue
                </motion.p>
              </motion.div>

              <form onSubmit={submitHandler} className="space-y-5">
                <motion.div
                  {...loginAnimations.inputVariants}
                  transition={loginAnimations.emailInputTransition}
                  className="space-y-2"
                >
                  <Label>
                    Email or Username <span className="text-yellow-400">*</span>
                  </Label>
                  <Input
                    type="text"
                    placeholder="Enter your email or username"
                    required
                    onChange={(e) => setEmail_username(e.target.value)}
                  />
                </motion.div>

                <motion.div
                  {...loginAnimations.inputVariants}
                  transition={loginAnimations.passwordInputTransition}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <Label>
                      Password <span className="text-yellow-400">*</span>
                    </Label>
                  </div>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </motion.div>

                <div className="flex justify-end">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                  >
                    <Link
                      to="/password/forgot-password"
                      className="text-sm text-yellow-400 hover:text-yellow-300"
                    >
                      Forgot your password?
                    </Link>
                  </motion.div>
                </div>

                <motion.div
                  {...loginAnimations.buttonVariants}
                  className="pt-2"
                >
                  <Button
                    type="submit"
                    variant="submit"
                    size="lg"
                    disabled={isLoading}
                  >
                    <span className="relative z-10">
                      {isLoading ? "Loading..." : "Log In"}
                    </span>
                  </Button>
                </motion.div>
              </form>
              <motion.div
                className="text-gray-400 text-sm pt-5 flex items-start leading-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <p>
                  By logging in, you agree to our{" "}
                  <Link
                    to="/terms-of-use"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy-policy"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Privacy Policy
                  </Link>{" "}
                </p>
              </motion.div>

              <motion.div
                className="text-center text-gray-300 pt-5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <p>
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-yellow-400 hover:text-yellow-300 font-medium"
                  >
                    Register here
                  </Link>
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Image */}
          <motion.div
            {...loginAnimations.imageContainerVariants}
            className="hidden md:block place-self-center"
          >
            <motion.div
              className="max-w-xl w-full"
              {...loginAnimations.imageVariants}
            >
              <img
                src={LoginImg}
                alt="Login illustration"
                className="w-full h-auto object-contain"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Login;
