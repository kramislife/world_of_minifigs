import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRegisterMutation } from "@/redux/api/authApi";
import RegisterImg from "@/assets/authAssets/Register.png";
import { registerAnimations } from "@/hooks/animationConfig";
import { useSelector } from "react-redux";
import Metadata from "@/components/layout/Metadata/Metadata";

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    contact: "",
  });

  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const [register, { isLoading, isError, error, data, isSuccess }] =
    useRegisterMutation();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    if (isError) {
      toast.error(
        error?.data?.message || "An error occurred. Please try again."
      );
    }

    if (isSuccess) {
      toast.success(data?.message);
      navigate("/login");
    }
  }, [isError, error, isSuccess, data, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      !formData.fullname ||
      !formData.email ||
      !formData.username ||
      !formData.contact
    ) {
      return toast.error("All fields are required!");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return toast.error("Invalid email format.");
    }

    if (formData.password.length < 6) {
      return toast.error("Password should be at least 6 characters long.");
    }

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Password and Confirm password should match.");
    }

    const signUpData = {
      name: formData.fullname,
      email: formData.email,
      username: formData.username,
      password: formData.password,
      contact_number: formData.contact,
    };

    register(signUpData);
  };

  return (
    <>
      <Metadata title="Register" />
    <div className="min-h-screen flex items-center justify-center bg-brand-gradient px-4 py-10">
      <div className="w-full max-w-7xl flex gap-12 items-center">
        {/* Left side - Animation */}
        <motion.div
          {...registerAnimations.imageContainerVariants}
          className="flex-1 hidden lg:block"
        >
          <motion.img
            src={RegisterImg}
            alt="Register illustration"
            className="w-full h-full object-contain drop-shadow-2xl filter saturate-110"
            {...registerAnimations.imageVariants}
          />
        </motion.div>

        {/* Right side - Register Form */}
        <motion.div
          {...registerAnimations.formContainerVariants}
          className="flex-1 p-8 rounded-3xl backdrop-blur-lg shadow-2xl bg-gradient-to-br from-brand-start/40 to-brand-end/40 border border-white/20 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent pointer-events-none" />

          <div className="space-y-8 py-5 px-2 relative">
            <motion.div
              {...registerAnimations.headerVariants}
              className="space-y-3"
            >
              <h1 className="text-4xl font-semibold text-white tracking-tight">
                Register Account
              </h1>
            </motion.div>

            <form className="space-y-6" onSubmit={submitHandler}>
              {/* Full Name Input */}
              <motion.div
                {...registerAnimations.getInputVariants(0.6)}
                className="space-y-4"
              >
                <label htmlFor="fullname" className="sr-only">
                  Full Name
                </label>
                <input
                  id="fullname"
                  type="text"
                  name="fullname"
                  placeholder="Full Name"
                  value={formData.fullname}
                  onChange={handleChange}
                  required
                  className="bg-darkBrand/50 w-full px-3 border-white/20 text-white placeholder:text-gray-400 h-14 rounded-xl focus:ring-2 focus:ring-light/40 focus:border-light/40 transition-all duration-300 text-md"
                  aria-label="Full Name"
                />
              </motion.div>

              {/* Username Input */}
              <motion.div
                {...registerAnimations.getInputVariants(0.7)}
                className="space-y-4"
              >
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="bg-darkBrand/50 w-full px-3 border-white/20 text-white placeholder:text-gray-400 h-14 rounded-xl focus:ring-2 focus:ring-light/40 focus:border-light/40 transition-all duration-300 text-md"
                  aria-label="Username"
                />
              </motion.div>

              {/* Contact Number Input */}
              <motion.div
                {...registerAnimations.getInputVariants(0.8)}
                className="space-y-4"
              >
                <label htmlFor="contact" className="sr-only">
                  Contact Number
                </label>
                <input
                  id="contact"
                  type="tel"
                  name="contact"
                  placeholder="Contact Number"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  className="bg-darkBrand/50 border-white/20 w-full px-3 text-white placeholder:text-gray-400 h-14 rounded-xl focus:ring-2 focus:ring-light/40 focus:border-light/40 transition-all duration-300 text-md"
                  aria-label="Contact Number"
                />
              </motion.div>

              {/* Email Input */}
              <motion.div
                {...registerAnimations.getInputVariants(0.9)}
                className="space-y-4"
              >
                <label htmlFor="email" className="sr-only">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-darkBrand/50 border-white/20 w-full px-3 text-white placeholder:text-gray-400 h-14 rounded-xl focus:ring-2 focus:ring-light/40 focus:border-light/40 transition-all duration-300 text-md"
                  aria-label="Email Address"
                />
              </motion.div>

              {/* Password Input */}
              <motion.div
                {...registerAnimations.getInputVariants(1.0)}
                className="space-y-4"
              >
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="bg-darkBrand/50 border-white/20 text-white w-full px-3 placeholder:text-gray-400 h-14 rounded-xl focus:ring-2 focus:ring-light/40 focus:border-light/40 transition-all duration-300 text-md"
                  aria-label="Password"
                />
              </motion.div>

              {/* Confirm Password Input */}
              <motion.div
                {...registerAnimations.getInputVariants(1.1)}
                className="space-y-4"
              >
                <label htmlFor="confirmPassword" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="bg-darkBrand/50 border-white/20 text-white w-full px-3 placeholder:text-gray-400 h-14 rounded-xl focus:ring-2 focus:ring-light/40 focus:border-light/40 transition-all duration-300 text-md"
                  aria-label="Confirm Password"
                />
              </motion.div>

              {/* Register Button */}
              <motion.div {...registerAnimations.buttonVariants}>
                <button
                  type="submit"
                  className="w-full bg-gradient-loop from-brand-start to-brand-end text-white h-14 rounded-xl text-md shadow-lg hover:scale-105 transition-transform duration-300 relative overflow-hidden group"
                  disabled={isLoading}
                >
                  <span className="relative z-10">
                    {isLoading ? "Registering..." : "Register"}
                  </span>
                </button>
              </motion.div>
            </form>

            {/* Login Link */}
            <motion.div
              {...registerAnimations.loginLinkVariants}
              className="text-light/90 text-md"
            >
              Already have an account?
              <Link
                to="/login"
                className="text-red-500 hover:text-white transition-colors duration-300 font-md underline px-2"
              >
                Login Now
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
    </>
  );
};

export default Register;
