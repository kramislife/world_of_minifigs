import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Check, Loader2, X } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Metadata from "@/components/layout/Metadata/Metadata";
import RegisterImg from "@/assets/authAssets/Register.png";
import { authAnimations } from "@/hooks/Animation/animationConfig";
import { useRegisterMutation } from "@/redux/api/authApi";

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

  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecial: false,
  });

  // Add state for password focus
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    if (isError) {
      toast.error(
        error?.data?.message || "Registration failed. Please try again."
      );
    }

    if (isSuccess) {
      toast.success(data?.message || "Registration successful!");
      navigate("/login");
    }
  }, [isError, error, isSuccess, data, navigate]);

  const checkPasswordValidation = (password) => {
    setPasswordValidation({
      minLength: password.length >= 6,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecial: /[!@#$%^&*_]/.test(password),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      checkPasswordValidation(value);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // Check if all password requirements are met
    const allRequirementsMet = Object.values(passwordValidation).every(
      (requirement) => requirement
    );

    if (!allRequirementsMet) {
      return toast.error("Please meet all password requirements");
    }

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
    {
      id: "fullname",
      label: "Full Name",
      type: "text",
      placeholder: "Enter your full name",
      fullWidth: false,
    },
    {
      id: "username",
      label: "Username",
      type: "text",
      placeholder: "Choose a username",
      fullWidth: false,
    },
    {
      id: "contact",
      label: "Contact Number",
      type: "tel",
      placeholder: "Enter your contact number",
      fullWidth: false,
    },
    {
      id: "email",
      label: "Email Address",
      type: "email",
      placeholder: "Enter your email address",
      fullWidth: false,
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      placeholder: "Create a password",
      fullWidth: true,
    },
    {
      id: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      placeholder: "Confirm your password",
      fullWidth: true,
    },
  ];

  // Modify password requirements component
  const PasswordRequirement = ({ met, text }) => (
    <div className="flex items-start gap-2 text-sm">
      {met ? (
        <Check className="w-4 h-4 text-green-500 mt-0.5" />
      ) : (
        <X className="w-4 h-4 text-red-500 mt-0.5" />
      )}
      <span className={met ? "text-green-500" : "text-gray-300"}>{text}</span>
    </div>
  );

  // Password requirements data
  const passwordRequirements = [
    { key: "minLength", text: "At least 6 characters" },
    { key: "hasUppercase", text: "One uppercase letter" },
    { key: "hasLowercase", text: "One lowercase letter" },
    { key: "hasNumber", text: "One number" },
    { key: "hasSpecial", text: "One special character (!@#$%^&*_)" },
  ];

  // Modify renderPasswordField to include focus handling
  const renderPasswordField = (field, index) => (
    <motion.div
      key={field.id}
      {...authAnimations.inputVariants}
      transition={authAnimations.getInputTransition(index)}
      className={`space-y-2 ${field.fullWidth ? "md:col-span-2" : ""}`}
    >
      <Label htmlFor={field.id} className="text-background">
        {field.label}
      </Label>
      <Input
        id={field.id}
        type={field.type}
        name={field.id}
        placeholder={field.placeholder}
        value={formData[field.id]}
        onChange={handleChange}
        onFocus={() => field.id === "password" && setIsPasswordFocused(true)}
        onBlur={() => field.id === "password" && setIsPasswordFocused(false)}
        required
      />
      {field.id === "password" && isPasswordFocused && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-2"
        >
          <div className="pt-3">
            <h4 className="text-sm font-medium text-gray-300 mb-2">
              Password Requirements:
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {passwordRequirements.map((requirement) => (
                <PasswordRequirement
                  key={requirement.key}
                  met={passwordValidation[requirement.key]}
                  text={requirement.text}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );

  return (
    <>
      <Metadata title="Register" />
      <section className="px-3 py-5 container mx-auto grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* Left side - Image */}
        <motion.div
          {...authAnimations.imageContainerVariants}
          className="hidden md:block place-self-center"
        >
          <motion.div
            className="max-w-xl w-full"
            {...authAnimations.imageVariants}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formFields.map((field, index) =>
                  field.id === "password" ? (
                    renderPasswordField(field, index)
                  ) : (
                    <motion.div
                      key={field.id}
                      {...authAnimations.inputVariants}
                      transition={authAnimations.getInputTransition(index)}
                      className={`space-y-2 ${
                        field.fullWidth ? "md:col-span-2" : ""
                      }`}
                    >
                      <Label htmlFor={field.id} className="text-background">
                        {field.label}
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
                  )
                )}
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
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    "Register Now"
                  )}
                </Button>
              </motion.div>
            </form>

            <motion.div
              className="text-center text-gray-300 pt-5"
              {...authAnimations.linkVariants}
            >
              <p>
                Already have an account?{" "}
                <Link to="/login" className="text-accent hover:text-accent/80">
                  Log in here
                </Link>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Register;
