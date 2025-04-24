import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import LoginImg from "@/assets/authAssets/Login.png";
import Metadata from "@/components/layout/Metadata/Metadata";
import { authAnimations } from "@/hooks/Animation/animationConfig";
import { useLoginMutation } from "@/redux/api/authApi";

const Login = () => {
  const [email_username, setEmail_username] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const from =
    typeof location.state?.from === "string" ? location.state.from : "/";
  const returnTo = location.state?.returnTo;

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (isAuthenticated) {
      if (returnTo === "product" && location.state?.action === "vote") {
        navigate(from);
        return;
      }

      const isAdminOrEmployee = ["admin", "employee", "superAdmin"].includes(
        user?.role
      );

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
      const result = await login({ email_username, password }).unwrap();
      toast.success(result?.message);
    } catch (err) {
      toast.error(err?.data?.message || "An error occurred during login");
    }
  };

  const formFields = [
    {
      id: "email_username",
      label: "Email or Username",
      type: "text",
      placeholder: "Enter your email or username",
      required: true,
      onChange: (e) => setEmail_username(e.target.value),
      transition: authAnimations.getInputTransition(0),
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      required: true,
      onChange: (e) => setPassword(e.target.value),
      transition: authAnimations.getInputTransition(1),
    },
  ];

  const termsLinks = [
    {
      to: "/terms-of-use",
      label: "Terms of Service",
    },
    {
      to: "/privacy-policy",
      label: "Privacy Policy",
    },
  ];

  return (
    <>
      <Metadata title="Login" />
      <section className="px-3 py-5 container mx-auto grid grid-cols-1 md:grid-cols-2 gap-2 max-w-7xl">
        {/* Left side - Login Form */}
        <motion.div
          {...authAnimations.formContainerVariants}
          className="w-full md:px-5 py-10 md:border border-brand-end/50 rounded-2xl"
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
              {formFields.map((field, index) => (
                <motion.div
                  key={field.id}
                  {...authAnimations.inputVariants}
                  transition={field.transition}
                  className="space-y-2"
                >
                  <Label htmlFor={field.id} className="text-background">
                    {field.label}
                  </Label>
                  <Input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    required={field.required}
                    onChange={field.onChange}
                  />
                </motion.div>
              ))}

              <div className="flex justify-end">
                <motion.div
                  {...authAnimations.inputVariants}
                  transition={authAnimations.getInputTransition(2)}
                >
                  <Link
                    to="/password/forgot-password"
                    className="text-sm text-accent hover:text-accent/80"
                  >
                    Forgot your password?
                  </Link>
                </motion.div>
              </div>

              <motion.div {...authAnimations.buttonVariants}>
                <Button
                  type="submit"
                  variant="submit"
                  className="w-full"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="animate-spin w-5 h-5" />
                      <span>Logging in...</span>
                    </div>
                  ) : (
                    "Log In"
                  )}
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
                {termsLinks.map((link, i) => (
                  <span key={link.to}>
                    <Link
                      to={link.to}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      {link.label}
                    </Link>
                    {i === 0 && " and "}
                  </span>
                ))}
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
                  className="text-accent hover:text-accent/80"
                >
                  Register here
                </Link>
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Right side - Image */}
        <motion.div
          {...authAnimations.imageContainerVariants}
          className="hidden md:block place-self-center"
        >
          <motion.div
            className="max-w-xl w-full"
            {...authAnimations.imageVariants}
          >
            <img
              src={LoginImg}
              alt="Login illustration"
              className="w-full h-auto object-contain"
            />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default Login;
