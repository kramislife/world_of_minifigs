import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

const Customer = ({ user }) => {
  return (
    <Card className="bg-brand-dark/20 border border-brand-end/50">
      <CardHeader>
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-purple-500" />
          <h3 className="text-lg font-semibold text-white">Customer Details</h3>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-400">Name</p>
            <p className="font-medium mt-1 text-white">{user.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Email</p>
            <p className="font-medium mt-1 text-white">{user.email}</p>
          </div>
          {user.phone && (
            <div>
              <p className="text-sm text-gray-400">Phone</p>
              <p className="font-medium mt-1 text-white">{user.phone}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Customer;
