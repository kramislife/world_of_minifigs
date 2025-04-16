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
    <Card className="bg-brand-dark/20 border border-brand-end/50">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2 text-lg">
          <Mail className="w-5 h-5 text-accent" />
          Contact Information
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 md:px-5">
        <Input
          type="email"
          label="Email Address"
          value={email}
          onChange={onEmailChange}
          required
            className="bg-transparent text-white"
          />
          {email && !isValid && (
            <p className="text-sm text-red-400 mt-3">
              Please enter a valid email address
            </p>
          )}
          {email && isValid && (
            <p className="text-xs md:text-sm text-blue-400 mt-3">
              Order confirmation will be sent to this email address
            </p>
          )}
      </CardContent>
    </Card>
  );
};

export default ContactSection;
