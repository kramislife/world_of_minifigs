import React from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

const ContactSection = ({ email, onEmailChange }) => {
  return (
    <Card className="bg-darkBrand/20 backdrop-blur-xl border-white/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2 text-lg">
          <User className="w-5 h-5 text-blue-400" />
          Contact Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          variant="floating"
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder=" "
        />
      </CardContent>
    </Card>
  );
};

export default ContactSection;
