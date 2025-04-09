import React from "react";
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
import { Label } from "@/components/ui/label";

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

  const formFields = [
    // First row
    [
      {
        id: "fullname",
        label: "Full Name",
        type: "text",
        placeholder: "Enter your full name",
        delay: 0.6,
      },
      {
        id: "username",
        label: "Username",
        type: "text",
        placeholder: "Choose a username",
        delay: 0.7,
      },
    ],
    // Second row
    [
      {
        id: "contact",
        label: "Contact Number",
        type: "tel",
        placeholder: "Enter your contact number",
        delay: 0.8,
      },
      {
        id: "email",
        label: "Email Address",
        type: "email",
        placeholder: "Enter your email address",
        delay: 0.9,
      },
    ],
    // Single fields
    [
      {
        id: "password",
        label: "Password",
        type: "password",
        placeholder: "Create a password",
        delay: 1.0,
        fullWidth: true,
      },
      {
        id: "confirmPassword",
        label: "Confirm Password",
        type: "password",
        placeholder: "Confirm your password",
        delay: 1.1,
        fullWidth: true,
      },
    ],
  ];

  const renderFormFields = (fields, isRow = true) => {
    return (
      <div
        className={`grid grid-cols-1 ${
          isRow ? "md:grid-cols-2 gap-4" : "gap-5"
        }`}
      >
        {fields.map((field) => (
          <motion.div
            key={field.id}
            {...registerAnimations.getInputVariants(field.delay)}
            className={`space-y-2 ${field.fullWidth ? "md:col-span-2" : ""}`}
          >
            <Label>
              {field.label} <span className="text-yellow-400">*</span>
            </Label>
            <Input
              id={field.id}
              type={field.type}
              name={field.id}
              placeholder={field.placeholder}
              value={formData[field.id]}
              onChange={handleChange}
              required
            />
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <>
      <Metadata title="Register" />
      <div className="px-3 md:px-10 py-12 md:py-7">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                {formFields.map((row, index) => (
                  <div key={index}>
                    {renderFormFields(row, index < 2)}
                  </div>
                ))}

                {/* Register Button */}
                <motion.div
                  {...registerAnimations.buttonVariants}
                  className="pt-2"
                >
                  <Button
                    type="submit"
                    variant="submit"
                    size="lg"
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
