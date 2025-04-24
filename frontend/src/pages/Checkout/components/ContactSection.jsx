import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { Label } from "@/components/ui/label";

const ContactSection = ({ email, onEmailChange, emailIsValid }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-background flex items-center gap-2 text-lg">
          <Mail className="w-5 h-5 text-accent" />
          Contact Information
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 md:px-5">
        <Label className="text-background">Email Address</Label>
        <Input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={onEmailChange}
          required
          className="bg-transparent text-background border border-brand-end/50 placeholder:text-gray-300 mt-2"
        />
        {email && !emailIsValid && (
          <p className="text-sm text-red-400 mt-3">
            Please enter a valid email address
          </p>
        )}
        {email && emailIsValid && (
          <p className="text-xs md:text-sm text-blue-400 mt-3">
            Order confirmation will be sent to this email address
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactSection;
