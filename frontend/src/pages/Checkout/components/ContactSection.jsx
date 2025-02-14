import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

const ContactSection = ({ email, onEmailChange }) => {
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValid = !email || isValidEmail(email);

  return (
    <Card className="bg-darkBrand/20 backdrop-blur-xl border-white/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2 text-lg">
          <Mail className="w-5 h-5 text-blue-400" />
          Contact Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <Input
              type="email"
              variant="floating"
              label="Email Address"
              value={email}
              onChange={onEmailChange}
              required
              placeholder=" "
              className={`bg-transparent border-white/10 transition-colors ${
                !isValid
                  ? "border-red-500 focus:border-red-500"
                  : "focus:border-blue-500"
              }`}
            />
            {email && !isValid && (
              <p className="text-xs text-red-400 mt-1 ml-1">
                Please enter a valid email address
              </p>
            )}
            {email && isValid && (
              <p className="text-xs text-blue-400 mt-3 ml-1">
                Order confirmation will be sent to this email address
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactSection;
