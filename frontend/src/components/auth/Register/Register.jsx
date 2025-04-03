import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRegisterMutation } from "@/redux/api/authApi";
import RegisterImg from "@/assets/authAssets/Register.png";
import { registerAnimations } from "@/hooks/Animation/animationConfig";
import { useSelector } from "react-redux";
import Metadata from "@/components/layout/Metadata/Metadata";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
      <div className="px-3 md:px-10 py-12 md:py-7">
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-8 ">
          {/* Left side - Image */}
          <motion.div
            {...registerAnimations.imageContainerVariants}
            className="hidden md:block place-self-center"
          >
            <motion.div
              className="max-w-2xl w-full"
              {...registerAnimations.imageVariants}
            >
              <img
                src={RegisterImg}
                alt="Register illustration"
                className="w-full h-auto object-contain"
              />
            </motion.div>
          </motion.div>

          {/* Right side - Register Form */}
          <motion.div
            {...registerAnimations.formContainerVariants}
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
                  Create Account
                </motion.h1>
                <motion.p
                  className="text-gray-400 text-sm mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Join our community to discover amazing collections
                </motion.p>
              </motion.div>

              <form className="space-y-5" onSubmit={submitHandler}>
                {/* Full Name and Username Inputs in 2 columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Full Name Input */}
                  <motion.div
                    {...registerAnimations.getInputVariants(0.6)}
                    className="space-y-2"
                  >
                    <label className="block text-sm font-medium">
                      Full Name <span className="text-yellow-400">*</span>
                    </label>
                    <Input
                      id="fullname"
                      type="text"
                      name="fullname"
                      placeholder="Enter your full name"
                      value={formData.fullname}
                      onChange={handleChange}
                      required
                    />
                  </motion.div>

                  {/* Username Input */}
                  <motion.div
                    {...registerAnimations.getInputVariants(0.7)}
                    className="space-y-2"
                  >
                    <label className="block text-sm font-medium">
                      Username <span className="text-yellow-400">*</span>
                    </label>
                    <Input
                      id="username"
                      type="text"
                      name="username"
                      placeholder="Choose a username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </motion.div>
                </div>

                {/* Contact Number and Email Inputs in 2 columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Contact Number Input */}
                  <motion.div
                    {...registerAnimations.getInputVariants(0.8)}
                    className="space-y-2"
                  >
                    <label className="block text-sm font-medium">
                      Contact Number <span className="text-yellow-400">*</span>
                    </label>
                    <Input
                      id="contact"
                      type="tel"
                      name="contact"
                      placeholder="Enter your contact number"
                      value={formData.contact}
                      onChange={handleChange}
                      required
                    />
                  </motion.div>

                  {/* Email Input */}
                  <motion.div
                    {...registerAnimations.getInputVariants(0.9)}
                    className="space-y-2"
                  >
                    <label className="block text-sm font-medium">
                      Email Address <span className="text-yellow-400">*</span>
                    </label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </motion.div>
                </div>

                {/* Password Input */}
                <motion.div
                  {...registerAnimations.getInputVariants(1.0)}
                  className="space-y-2"
                >
                  <label className="block text-sm font-medium">
                    Password <span className="text-yellow-400">*</span>
                  </label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    require
                  />
                </motion.div>

                {/* Confirm Password Input */}
                <motion.div
                  {...registerAnimations.getInputVariants(1.1)}
                  className="space-y-2"
                >
                  <label className="block text-sm font-medium">
                    Confirm Password <span className="text-yellow-400">*</span>
                  </label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    require
                  />
                </motion.div>

                {/* Register Button */}
                <motion.div
                  {...registerAnimations.buttonVariants}
                  className="pt-2"
                >
                  <Button
                    type="submit"
                    className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white font-medium py-3 h-12 rounded-md transition-colors"
                    disabled={isLoading}
                  >
                    <span className="relative z-10">
                      {isLoading ? "Creating Account..." : "Register Now"}
                    </span>
                  </Button>
                </motion.div>
              </form>

              <motion.div
                className="text-center text-gray-300 pt-5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <p>
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-yellow-400 hover:text-yellow-300 font-medium"
                  >
                    Log in here
                  </Link>
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Register;
