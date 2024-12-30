import { motion } from "framer-motion";
import LoginImg from "@/assets/authAssets/Login.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { loginAnimations } from "@/hooks/animationConfig";
import { useEffect, useState } from "react";
import { useLoginMutation } from "@/redux/api/authApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Metadata from "@/components/layout/Metadata/Metadata";

const Login = () => {
  const [email_username, setEmail_username] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (isAuthenticated) {
      // If user is admin/employee and trying to access admin routes, let them
      // Otherwise, redirect based on role
      const isAdminOrEmployee = ["admin", "employee", "superAdmin"].includes(
        user?.role
      );
      
      if (from.startsWith("/admin")) {
        if (isAdminOrEmployee) {
          navigate(from);
        } else {
          navigate("/");
        }
      } else {
        navigate(isAdminOrEmployee ? "/admin" : from);
      }
    }
  }, [isAuthenticated, user, navigate, from]);

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
      <div className="min-h-screen flex items-center justify-center bg-brand-gradient p-4">
        <div className="w-full max-w-7xl flex gap-12 items-center">
          <motion.div
            {...loginAnimations.imageContainerVariants}
            className="flex-1 hidden lg:block"
          >
            <motion.img
              src={LoginImg}
              alt="Login illustration"
              className="w-full h-full object-contain drop-shadow-2xl filter saturate-110"
              {...loginAnimations.imageVariants}
            />
          </motion.div>

          {/* Right side - Login Form */}
          <motion.div
            {...loginAnimations.formContainerVariants}
            className="flex-1 p-8 rounded-3xl backdrop-blur-lg shadow-2xl bg-gradient-to-br from-brand-start/40 to-brand-end/40 border border-white/20 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent pointer-events-none" />

            <div className="space-y-10 py-10 px-2 relative">
              <motion.div
                {...loginAnimations.headerVariants}
                className="space-y-3"
              >
                <h1 className="text-4xl font-bold text-white tracking-tight">
                  Login
                </h1>
                <p className="text-light/90 text-md tracking-wide font-light">
                  Enter your details below to Sign-in
                </p>
              </motion.div>

              <form className="space-y-7">
                <motion.div
                  {...loginAnimations.inputVariants}
                  transition={loginAnimations.emailInputTransition}
                  className="space-y-4"
                >
                  <input
                    type="text"
                    placeholder="Email Address or Username"
                    className="bg-darkBrand/50 border-white/20 text-white placeholder:text-gray-400 h-14 w-full rounded-xl focus:ring-2 focus:ring-light/40 focus:border-light/40 transition-all duration-300 text-md px-3"
                    required
                    onChange={(e) => {
                      setEmail_username(e.target.value);
                    }}
                  />
                </motion.div>

                <motion.div
                  {...loginAnimations.inputVariants}
                  transition={loginAnimations.passwordInputTransition}
                  className="space-y-4"
                >
                  <input
                    type="password"
                    placeholder="Password"
                    className="bg-darkBrand/50 border-white/20 text-white placeholder:text-gray-400 h-14 rounded-xl focus:ring-2 focus:ring-light/40 focus:border-light/40 transition-all duration-300 text-md w-full px-3"
                    required
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </motion.div>

                <motion.div
                  {...loginAnimations.forgotPasswordVariants}
                  className="text-right"
                >
                  <Link
                    to="/forgot_password"
                    className="text-sm hover:text-blue transition-colors duration-300 font-md underline tracking-widest text-red-500 hover:text-white"
                  >
                    Forgot Password?
                  </Link>
                </motion.div>

                <motion.div {...loginAnimations.buttonVariants}>
                  <button
                    type="submit"
                    className="w-full bg-gradient-r border border-brand hover:bg-brand-gradient text-white h-14 rounded-xl text-md shadow-lg transition-all duration-300 relative overflow-hidden group tracking-wider"
                    onClick={submitHandler}
                  >
                    <span className="relative z-10">
                      {isLoading ? "Loading.." : "Log in"}
                    </span>
                  </button>
                </motion.div>
              </form>

              <motion.div
                {...loginAnimations.registerLinkVariants}
                className="text-light/90 text-md"
              >
                Don't have an account?
                <Link
                  to="/register"
                  className="text-blue hover:text-white transition-colors duration-300 font-md underline text-red-500 tracking-wider px-2"
                >
                  Register Now
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Login;
