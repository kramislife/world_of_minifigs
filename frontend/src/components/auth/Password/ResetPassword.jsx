import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Check, Loader2, X } from "lucide-react";
import Metadata from "@/components/layout/Metadata/Metadata";
import { authAnimations } from "@/hooks/Animation/animationConfig";
import { useResetPasswordMutation } from "@/redux/api/authApi";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const { token } = useParams();
  const navigate = useNavigate();

  // Password validation state
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecial: false,
  });

  // Password requirements component
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

  // Check password validation
  const checkPasswordValidation = (password) => {
    setPasswordValidation({
      minLength: password.length >= 6,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecial: /[!@#$%^&*_]/.test(password),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all password requirements are met
    const allRequirementsMet = Object.values(passwordValidation).every(
      (requirement) => requirement
    );

    if (!allRequirementsMet) {
      toast.error("Please meet all password requirements");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const result = await resetPassword({
        token,
        password,
        confirmPassword,
      }).unwrap();
      toast.success(result?.message || "Password reset successfully");
      navigate("/login");
    } catch (err) {
      const errorMessage = err?.data?.message || "An error occurred";
      setError(errorMessage);
    }
  };

  return (
    <>
      <Metadata title="Reset Password" />
      <div className="px-3 py-10">
        <div className="container mx-auto max-w-lg">
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
                  Reset Password
                </motion.h1>
                <motion.p
                  className="text-gray-400 text-sm mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Enter your new password
                </motion.p>
                {error && (
                  <p className="text-red-500 text-sm bg-red-100/10 p-3 rounded-lg mt-3">
                    {error}
                  </p>
                )}
              </motion.div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <motion.div
                  {...authAnimations.inputVariants}
                  transition={authAnimations.getInputTransition(0)}
                  className="space-y-2"
                >
                  <Label className="text-background">New Password</Label>
                  <Input
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      checkPasswordValidation(e.target.value);
                    }}
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                    required
                    disabled={!!error}
                  />
                  {isPasswordFocused && (
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

                <motion.div
                  {...authAnimations.inputVariants}
                  transition={authAnimations.getInputTransition(1)}
                  className="space-y-2"
                >
                  <Label className="text-background">Confirm Password</Label>
                  <Input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={!!error}
                  />
                </motion.div>

                <motion.div {...authAnimations.buttonVariants} className="pt-2">
                  <Button
                    type="submit"
                    variant="submit"
                    size="lg"
                    className="w-full flex items-center justify-center gap-2"
                    disabled={isLoading || !!error}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Resetting Password...
                      </>
                    ) : (
                      "Reset Password"
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

export default ResetPassword;
